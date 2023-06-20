/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { findChildren } from '@tiptap/core';
import type { CodeBlockOptions } from '@tiptap/extension-code-block';
import { CodeBlock } from '@tiptap/extension-code-block';
import type { Node as ProsemirrorNode } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import jsx from 'refractor/lang/jsx';
import tsx from 'refractor/lang/tsx';
import type { RefractorElement } from 'refractor/lib/common';
import { refractor } from 'refractor/lib/common';

refractor.register(jsx);
refractor.register(tsx);
refractor.alias('jsx', 'javascriptreact');
refractor.alias('tsx', 'typescriptreact');

export interface CodeBlockRefractorOptions {
  /**
   * 为应用于代码标签的语言类添加前缀
   * 默认为 language-
   */
  languageClassPrefix: string;
  /**
   * 定义节点是否应该在三次输入时退出
   * 默认为 true
   */
  exitOnTripleEnter: boolean;
  /**
   * 定义如果节点后面没有节点，是否应该退出箭头向下的节点
   * 默认为 true
   */
  exitOnArrowDown: boolean;
  /**
   * 应添加到呈现的 HTML 标记的自定义 HTML 属性。
   */
  HTMLAttributes: Record<string, any>;
}

type FlattedNode = {
  text: string;
  className: string[];
};

type RefractorNode = RefractorElement | Text;

const flatNodes = (nodes: RefractorNode[], className: string[] = []) =>
  nodes.flatMap((node: any): FlattedNode[] =>
    node.type === 'element'
      ? flatNodes(node.children, [
          ...className,
          ...((node.properties?.['className'] as string[]) || []),
        ])
      : [{ text: node.value, className }],
  );

function getDecorations({
  doc,
  name,
  refractor,
  defaultLanguage,
}: {
  doc: ProsemirrorNode;
  name: string;
  refractor: any;
  defaultLanguage: string;
}) {
  const decorations: Decoration[] = [];

  findChildren(doc, (node) => node.type.name === name).forEach((block) => {
    const { highlight, listLanguages } = refractor;

    const language = block.node.attrs.language || defaultLanguage;
    const languages = listLanguages();

    const nodes = highlight(
      block.node.textContent,
      languages.includes(language) ? language : defaultLanguage,
    );

    let from = block.pos + 1;
    flatNodes(nodes.children).forEach((node) => {
      const to = from + node.text.length;

      if (node.className.length) {
        const decoration = Decoration.inline(from, to, {
          class: node.className.join(' '),
        });

        decorations.push(decoration);
      }

      from = to;
    });
  });

  return DecorationSet.create(doc, decorations.reverse());
}

export function RefractorPlugin({
  name,
  refractor,
  defaultLanguage,
}: {
  name: string;
  refractor: any;
  defaultLanguage: string;
}) {
  return new Plugin({
    key: new PluginKey('codeBlockRefractor'),

    state: {
      init: (_, { doc }) =>
        getDecorations({
          doc,
          name,
          refractor,
          defaultLanguage,
        }),
      apply: (transaction, decorationSet, oldState, newState) => {
        const oldNodeName = oldState.selection.$head.parent.type.name;
        const newNodeName = newState.selection.$head.parent.type.name;
        const oldNodes = findChildren(
          oldState.doc,
          (node) => node.type.name === name,
        );
        const newNodes = findChildren(
          newState.doc,
          (node) => node.type.name === name,
        );

        if (
          transaction.docChanged &&
          // 在以下情况下应用装饰：
          // 1. 选择包括命名节点，
          ([oldNodeName, newNodeName].includes(name) ||
            // 2. 事务添加/删除命名节点，
            newNodes.length !== oldNodes.length ||
            // 3. 事务具有完全封装节点的更改
            //（例如，影响整个文档的事务）。
            // 例如，此类事务可能在通过 y-prosemirror 进行协作同步期间发生。
            transaction.steps.some((step) => {
              return (
                // @ts-ignore
                step.from !== undefined &&
                // @ts-ignore
                step.to !== undefined &&
                oldNodes.some((node) => {
                  return (
                    // @ts-ignore
                    node.pos >= step.from &&
                    // @ts-ignore
                    node.pos + node.node.nodeSize <= step.to
                  );
                })
              );
            }))
        ) {
          return getDecorations({
            doc: transaction.doc,
            name,
            refractor,
            defaultLanguage,
          });
        }

        return decorationSet.map(transaction.mapping, transaction.doc);
      },
    },

    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });
}

export interface CodeBlockRefractorOptions extends CodeBlockOptions {
  refractor: any;
  defaultLanguage: string;
}

export const CodeBlockRefractor = CodeBlock.extend<CodeBlockRefractorOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      refractor: refractor,
      defaultLanguage: 'plain',
    };
  },

  addAttributes() {
    const { defaultLanguage } = this.options;
    return {
      language: {
        default: defaultLanguage,
        parseHTML: (element) => {
          const { languageClassPrefix } = this.options;
          const classNames = [...(element.firstElementChild?.classList || [])];
          const languages = classNames
            .filter((className) => className.startsWith(languageClassPrefix))
            .map((className) => className.replace(languageClassPrefix, ''));

          return languages[0] || defaultLanguage;
        },
        rendered: false,
      },
    };
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('pre');

      dom.classList.add(`language-${node.attrs.language}`);

      const content = document.createElement('code');

      content.classList.add(`language-${node.attrs.language}`);
      dom.append(content);
      return {
        dom,
        contentDOM: content,
      };
    };
  },

  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() || []),
      RefractorPlugin({
        name: this.name,
        refractor: this.options.refractor,
        defaultLanguage: this.options.defaultLanguage,
      }),
    ];
  },
});
