import { css } from 'styled-system/css';

export const Demo02 = () => {
  return (
    <>
      <div>
        编写样式时，您可能需要根据特定条件应用特定更改，无论是基于断点、CSS
        伪状态、媒体查询还是自定义数据属性。
      </div>
      <div>
        Panda
        允许您编写条件样式，并提供常用条件快捷方式，让您的生活更轻松。假设您想要更改按钮悬停时的背景颜色。你可以这样做：
      </div>
      <span
        className={css({
          bg: 'red.500',
          _hover: { bg: 'red.700' },
        })}>
        hello world
      </span>
      {'=>'}
      <span
        className={css({
          bg: { base: 'red.500', _hover: 'red.700' },
        })}>
        hello world
      </span>
      <div>
        Panda
        中的条件可以嵌套，这意味着您可以将多个条件应用于单个属性或另一个条件。假设您想要更改按钮聚焦和悬停时的背景颜色。你可以这样做：
      </div>
      <button
        className={css({
          bg: { base: 'red.500', _hover: { _focus: 'red.700' } },
        })}>
        Hover me
      </button>
      <p>Panda 包含一组常见的伪状态，您可以使用它们来设置组件的样式：</p>
      <p>
        伪类： _hover 、 _active 、 _focus 、 _focus-visible 、 _focus-within 、
        _disabled
      </p>
      <p>伪元素： _before 、 _after</p>
      <p>媒体查询： sm 、 md 、 lg 、 xl 、 2xl</p>
      <p>
        数据属性选择器： _horizontal 、 _vertical 、 _portrait 、 _landscape
      </p>
      <p>
        如果您需要一个配置条件中未定义的一次性选择器怎么办？您可以使用 css
        函数为任意选择器生成类：
      </p>
      <div
        className={css({
          '&[data-state=closed]': { color: 'red.300' },
          '& > *': { m: '2', p: '1' },
        })}
        data-state="closed">
        <span className={css({ bg: 'green.300' })}>1</span>
        <span className={css({ bg: 'green.300' })}>2</span>
      </div>
      <div className={css({ display: 'flex', containerType: 'size' })}>
        <div
          className={css({
            '@media (min-width: 768px)': {
              color: 'red.300',
            },
            '@container (min-width: 10px)': {
              color: 'green.300',
            },
            '@supports (display: flex)': {
              fontSize: '3xl',
              color: 'blue.300',
            },
          })}>
          hello world
        </div>
      </div>
      <h2>悬停、活动、聚焦和禁用</h2>
      <p>
        您可以使用元素的 _ 修饰符来设置元素的悬停、活动、焦点和禁用状态的样式：
      </p>
      <button
        className={css({
          bg: 'red.500',
          _hover: { bg: 'red.700' },
          _active: { bg: 'red.900' },
        })}>
        Hover me
      </button>
      <h2>第一个、最后一个、奇数、偶数</h2>
      <p>
        您可以使用 _ 修饰符来设置组中第一个、最后一个、奇数和偶数元素的样式：
      </p>
      <ul>
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <li
            key={item}
            className={css({
              _first: { color: 'red.500' },
              _last: { color: 'green.500' },
              _even: { bg: 'gray.100' },
              _odd: { bg: 'white' },
            })}>
            {item}
          </li>
        ))}
      </ul>

      <p>
        您可以使用元素的 _before 和 _after 修饰符来设置元素的 ::before 和
        ::after 伪元素的样式(注意：确保将内容值用双引号引起来。)
      </p>
      <div
        className={css({
          _before: { content: '"👋"' },
          _after: { content: '"👋"' },
        })}>
        Hello
      </div>
      <p>使用 _placeholder 修饰符设置任何输入或文本区域的占位符文本的样式：</p>
      <input
        placeholder="Enter your name"
        className={css({
          _placeholder: { color: 'red.500' },
        })}
      />
      <p>使用 _file 修饰符设置文件输入按钮的样式：</p>
      <input
        type="file"
        className={css({
          _file: { bg: 'gray.500', px: '4', py: '2', marginEnd: '3' },
        })}
      />

      <p>
        使用 _motionReduce 和 _motionSafe
        修饰符根据用户的动作偏好设置元素的样式：
      </p>
      <div
        className={css({
          _motionReduce: { transition: 'none' },
          _motionSafe: { transition: 'all 0.3s' },
        })}>
        Hello
      </div>

      <p>
        prefers-color-scheme
        媒体功能用于检测用户是否请求系统使用浅色或深色主题。 使用 _osLight 和
        _osDark 修饰符根据用户的配色方案首选项设置元素的样式：
      </p>
      <div
        className={css({
          bg: 'white',
          _osDark: { bg: 'black' },
        })}>
        Hello
      </div>
      <p>
        假设您的应用程序默认为深色，但您希望允许用户切换到浅色主题。你可以这样做：
      </p>
      <div
        className={css({
          bg: 'black',
          _osLight: { bg: 'white' },
        })}>
        Hello
      </div>
      <p>
        prefers-contrast
        媒体功能用于检测用户是否请求系统使用高对比度主题或低对比度主题。使用
        _highContrast 和 _lessContrast
        修饰符根据用户的颜色对比度首选项设置元素的样式：
      </p>
      <div
        className={css({
          bg: 'white',
          _highContrast: { bg: 'black' },
        })}>
        Hello
      </div>
      <p>
        orientation 媒体功能用于检测用户的设备是否处于纵向或横向模式。使用
        _portrait 和 _landscape 修饰符根据用户的设备方向设置元素的样式：
      </p>
      <div
        className={css({
          bg: 'red.300',
          _portrait: { bg: 'green.300' },
        })}>
        Hello
      </div>
      <h2>组选择</h2>
      <p>
        当您需要根据父元素的状态或属性设置元素的样式时，可以将 group
        类添加到父元素，并在子元素上使用任何 _group*
        修饰符。此修饰符适用于每个伪类修饰符，例如 _groupHover 、 _groupActive
        、 _groupFocus 和 _groupDisabled 等。
      </p>
      <div>
        Hover me
        <p className={css({ _groupHover: { bg: 'red.500' } })}>Hover me</p>
      </div>
      <h2>兄弟选择器</h2>
      <p>
        当您需要根据同级元素的状态或属性设置元素的样式时，可以将 peer
        类添加到同级元素，并在目标元素上使用任何 _peer*
        修饰符。注意：这仅适用于标记为 peer
        的元素是前一个同级元素，即它位于要开始的元素之前的情况。
      </p>
      <div>
        <p>Hover me</p>
        <p className={css({ _peerHover: { bg: 'red.500' } })}>
          I'll change by bg
        </p>{' '}
      </div>
      <h2> 数据属性</h2>
      <p>您可以使用 _ltr 和 _rtl 修饰符根据文本的方向设置元素的样式：</p>
      <div>
        <div
          className={css({
            _ltr: { ml: '3' },
            _rtl: { mr: '3' },
          })}>
          Hello
        </div>
      </div>
      <p>
        您可以使用相应的 {`_{state}`} 修饰符根据元素的 {`data-{state}`}
        属性设置元素的样式：这也适用于常见状态，例如 data-active 、
        data-disabled 、 data-focus 、 data-hover 、 data-invalid 、
        data-required 和 data-valid 。
        {`大多数 data-{state} 属性通常反映相应的浏览器伪类。例如， data-hover 相当于 :hover ， data-focus 相当于 :focus ， data-active 相当于 :active 。`}
      </p>
      <div
        data-loading
        className={css({
          _loading: { bg: 'gray.500' },
        })}>
        Hello
      </div>
      <h2>方向</h2>
      <p>
        您可以使用 _horizontal 和 _vertical 修饰符根据元素的 data-orientation
        属性设置元素的样式：
      </p>
      <div
        data-orientation="horizontal"
        className={css({
          _horizontal: { bg: 'red.500' },
          _vertical: { bg: 'blue.500' },
        })}>
        Hello
      </div>

      <h2></h2>
      <p>
        您可以使用相应的 {`_{state}`} 修饰符根据元素的 {`aria-{state}=true`}
        属性设置元素的样式：
        {`大多数 aria-{state} 属性通常反映浏览器伪类中的支持 ARIA 状态。例如， aria-checked=true 的样式为 _checked ， aria-disabled=true 的样式为 _disabled 。`}
      </p>
      <div
        aria-expanded="true"
        className={css({
          _expanded: { bg: 'gray.500' },
        })}>
        Hello
      </div>
      <h2>参考</h2>
      <table>
        <thead>
          <tr>
            <th>Condition name</th>
            <th>Selector</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>_hover</td>
            <td>
              <code>:is(:hover, [data-hover])</code>
            </td>
          </tr>
          <tr>
            <td>_focus</td>
            <td>
              <code>:is(:focus, [data-focus])</code>
            </td>
          </tr>
          <tr>
            <td>_focusWithin</td>
            <td>
              <code>:focus-within</code>
            </td>
          </tr>
          <tr>
            <td>_focusVisible</td>
            <td>
              <code>:is(:focus-visible, [data-focus-visible])</code>
            </td>
          </tr>
          <tr>
            <td>_disabled</td>
            <td>
              <code>:is(:disabled, [disabled], [data-disabled])</code>
            </td>
          </tr>
          <tr>
            <td>_active</td>
            <td>
              <code>:is(:active, [data-active])</code>
            </td>
          </tr>
          <tr>
            <td>_visited</td>
            <td>
              <code>:visited</code>
            </td>
          </tr>
          <tr>
            <td>_target</td>
            <td>
              <code>:target</code>
            </td>
          </tr>
          <tr>
            <td>_readOnly</td>
            <td>
              <code>:is(:read-only, [data-read-only])</code>
            </td>
          </tr>
          <tr>
            <td>_readWrite</td>
            <td>
              <code>:read-write</code>
            </td>
          </tr>
          <tr>
            <td>_empty</td>
            <td>
              <code>:is(:empty, [data-empty])</code>
            </td>
          </tr>
          <tr>
            <td>_checked</td>
            <td>
              <code>:is(:checked, [data-checked], [aria-checked=true])</code>
            </td>
          </tr>
          <tr>
            <td>_enabled</td>
            <td>
              <code>:enabled</code>
            </td>
          </tr>
          <tr>
            <td>_expanded</td>
            <td>
              <code>:is([aria-expanded=true], [data-expanded])</code>
            </td>
          </tr>
          <tr>
            <td>_highlighted</td>
            <td>
              <code>[data-highlighted]</code>
            </td>
          </tr>
          <tr>
            <td>_before</td>
            <td>
              <code>::before</code>
            </td>
          </tr>
          <tr>
            <td>_after</td>
            <td>
              <code>::after</code>
            </td>
          </tr>
          <tr>
            <td>_firstLetter</td>
            <td>
              <code>::first-letter</code>
            </td>
          </tr>
          <tr>
            <td>_firstLine</td>
            <td>
              <code>::first-line</code>
            </td>
          </tr>
          <tr>
            <td>_marker</td>
            <td>
              <code>::marker</code>
            </td>
          </tr>
          <tr>
            <td>_selection</td>
            <td>
              <code>::selection</code>
            </td>
          </tr>
          <tr>
            <td>_file</td>
            <td>
              <code>::file-selector-button</code>
            </td>
          </tr>
          <tr>
            <td>_backdrop</td>
            <td>
              <code>::backdrop</code>
            </td>
          </tr>
          <tr>
            <td>_first</td>
            <td>
              <code>:first-child</code>
            </td>
          </tr>
          <tr>
            <td>_last</td>
            <td>
              <code>:last-child</code>
            </td>
          </tr>
          <tr>
            <td>_only</td>
            <td>
              <code>:only-child</code>
            </td>
          </tr>
          <tr>
            <td>_even</td>
            <td>
              <code>:even</code>
            </td>
          </tr>
          <tr>
            <td>_odd</td>
            <td>
              <code>:odd</code>
            </td>
          </tr>
          <tr>
            <td>_firstOfType</td>
            <td>
              <code>:first-of-type</code>
            </td>
          </tr>
          <tr>
            <td>_lastOfType</td>
            <td>
              <code>:last-of-type</code>
            </td>
          </tr>
          <tr>
            <td>_onlyOfType</td>
            <td>
              <code>:only-of-type</code>
            </td>
          </tr>
          <tr>
            <td>_peerFocus</td>
            <td>
              <code>.peer:is(:focus, [data-focus]) ~ </code>
            </td>
          </tr>
          <tr>
            <td>_peerHover</td>
            <td>
              <code>.peer:is(:hover, [data-hover]) ~ </code>
            </td>
          </tr>
          <tr>
            <td>_peerActive</td>
            <td>
              <code>.peer:is(:active, [data-active]) ~ </code>
            </td>
          </tr>
          <tr>
            <td>_peerFocusWithin</td>
            <td>
              <code>.peer:focus-within ~ </code>
            </td>
          </tr>
          <tr>
            <td>_peerFocusVisible</td>
            <td>
              <code>.peer:is(:focus-visible, [data-focus-visible]) ~</code>
            </td>
          </tr>
          <tr>
            <td>_peerDisabled</td>
            <td>
              <code>.peer:is(:disabled, [disabled], [data-disabled]) ~</code>
            </td>
          </tr>
          <tr>
            <td>_peerChecked</td>
            <td>
              <code>
                .peer:is(:checked, [data-checked], [aria-checked=true]) ~
              </code>
            </td>
          </tr>
          <tr>
            <td>_peerInvalid</td>
            <td>
              <code>
                .peer:is(:invalid, [data-invalid], [aria-invalid=true]) ~
              </code>
            </td>
          </tr>
          <tr>
            <td>_peerExpanded</td>
            <td>
              <code>.peer:is([aria-expanded=true], [data-expanded]) ~</code>
            </td>
          </tr>
          <tr>
            <td>_peerPlaceholderShown</td>
            <td>
              <code>.peer:placeholder-shown ~ </code>
            </td>
          </tr>
          <tr>
            <td>_groupFocus</td>
            <td>
              <code>.group:is(:focus, [data-focus]) </code>
            </td>
          </tr>
          <tr>
            <td>_groupHover</td>
            <td>
              <code>.group:is(:hover, [data-hover]) </code>
            </td>
          </tr>
          <tr>
            <td>_groupActive</td>
            <td>
              <code>.group:is(:active, [data-active]) </code>
            </td>
          </tr>
          <tr>
            <td>_groupFocusWithin</td>
            <td>
              <code>.group:focus-within </code>
            </td>
          </tr>
          <tr>
            <td>_groupFocusVisible</td>
            <td>
              <code>.group:is(:focus-visible, [data-focus-visible]) </code>
            </td>
          </tr>
          <tr>
            <td>_groupDisabled</td>
            <td>
              <code>.group:is(:disabled, [disabled], [data-disabled])</code>
            </td>
          </tr>
          <tr>
            <td>_groupChecked</td>
            <td>
              <code>
                .group:is(:checked, [data-checked], [aria-checked=true])
              </code>
            </td>
          </tr>
          <tr>
            <td>_groupExpanded</td>
            <td>
              <code>.group:is([aria-expanded=true], [data-expanded])</code>
            </td>
          </tr>
          <tr>
            <td>_groupInvalid</td>
            <td>
              <code>.group:invalid </code>
            </td>
          </tr>
          <tr>
            <td>_indeterminate</td>
            <td>
              <code>
                :is(:indeterminate, [data-indeterminate], [aria-checked=mixed])
              </code>
            </td>
          </tr>
          <tr>
            <td>_required</td>
            <td>
              <code>:required</code>
            </td>
          </tr>
          <tr>
            <td>_valid</td>
            <td>
              <code>:is(:valid, [data-valid])</code>
            </td>
          </tr>
          <tr>
            <td>_invalid</td>
            <td>
              <code>:is(:invalid, [data-invalid])</code>
            </td>
          </tr>
          <tr>
            <td>_autofill</td>
            <td>
              <code>:autofill</code>
            </td>
          </tr>
          <tr>
            <td>_inRange</td>
            <td>
              <code>:in-range</code>
            </td>
          </tr>
          <tr>
            <td>_outOfRange</td>
            <td>
              <code>:out-of-range</code>
            </td>
          </tr>
          <tr>
            <td>_placeholder</td>
            <td>
              <code>:placeholder</code>
            </td>
          </tr>
          <tr>
            <td>_placeholderShown</td>
            <td>
              <code>:placeholder-shown</code>
            </td>
          </tr>
          <tr>
            <td>_pressed</td>
            <td>
              <code>:is([aria-pressed=true], [data-pressed])</code>
            </td>
          </tr>
          <tr>
            <td>_selected</td>
            <td>
              <code>:is([aria-selected=true], [data-selected])</code>
            </td>
          </tr>
          <tr>
            <td>_default</td>
            <td>
              <code>:default</code>
            </td>
          </tr>
          <tr>
            <td>_optional</td>
            <td>
              <code>:optional</code>
            </td>
          </tr>
          <tr>
            <td>_open</td>
            <td>
              <code>[open]</code>
            </td>
          </tr>
          <tr>
            <td>_fullscreen</td>
            <td>
              <code>:fullscreen</code>
            </td>
          </tr>
          <tr>
            <td>_loading</td>
            <td>
              <code>:is([data-loading], [aria-busy=true])</code>
            </td>
          </tr>
          <tr>
            <td>_currentPage</td>
            <td>
              <code>[aria-current=page]</code>
            </td>
          </tr>
          <tr>
            <td>_currentStep</td>
            <td>
              <code>[aria-current=step]</code>
            </td>
          </tr>
          <tr>
            <td>_motionReduce</td>
            <td>
              <code>@media (prefers-reduced-motion: reduce)</code>
            </td>
          </tr>
          <tr>
            <td>_motionSafe</td>
            <td>
              <code>@media (prefers-reduced-motion: no-preference)</code>
            </td>
          </tr>
          <tr>
            <td>_print</td>
            <td>
              <code>@media print</code>
            </td>
          </tr>
          <tr>
            <td>_landscape</td>
            <td>
              <code>@media (orientation: landscape)</code>
            </td>
          </tr>
          <tr>
            <td>_portrait</td>
            <td>
              <code>@media (orientation: portrait)</code>
            </td>
          </tr>
          <tr>
            <td>_dark</td>
            <td>
              <code>.dark, .dark </code>
            </td>
          </tr>
          <tr>
            <td>_light</td>
            <td>
              <code>.light, .light </code>
            </td>
          </tr>
          <tr>
            <td>_osDark</td>
            <td>
              <code>@media (prefers-color-scheme: dark)</code>
            </td>
          </tr>
          <tr>
            <td>_osLight</td>
            <td>
              <code>@media (prefers-color-scheme: light)</code>
            </td>
          </tr>
          <tr>
            <td>_highContrast</td>
            <td>
              <code>@media (forced-colors: active)</code>
            </td>
          </tr>
          <tr>
            <td>_lessContrast</td>
            <td>
              <code>@media (prefers-contrast: less)</code>
            </td>
          </tr>
          <tr>
            <td>_moreContrast</td>
            <td>
              <code>@media (prefers-contrast: more)</code>
            </td>
          </tr>
          <tr>
            <td>_ltr</td>
            <td>
              <code>[dir=ltr] </code>
            </td>
          </tr>
          <tr>
            <td>_rtl</td>
            <td>
              <code>[dir=rtl] </code>
            </td>
          </tr>
          <tr>
            <td>_scrollbar</td>
            <td>
              <code>::-webkit-scrollbar</code>
            </td>
          </tr>
          <tr>
            <td>_scrollbarThumb</td>
            <td>
              <code>::-webkit-scrollbar-thumb</code>
            </td>
          </tr>
          <tr>
            <td>_scrollbarTrack</td>
            <td>
              <code>::-webkit-scrollbar-track</code>
            </td>
          </tr>
          <tr>
            <td>_horizontal</td>
            <td>
              <code>[data-orientation=horizontal]</code>
            </td>
          </tr>
          <tr>
            <td>_vertical</td>
            <td>
              <code>[data-orientation=vertical]</code>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
