/**
 * @description: Canvas背景效果，变化的线条
 */

import './index.less';

import { useCallback, useEffect, useRef } from 'react';

export default function Background({
  row = 12,
  col = 8,
}: {
  row?: number;
  col?: number;
}) {
  const myCanvas = useRef<HTMLCanvasElement>(null);
  const data = useRef<{
    ctx: any;
    dots: Array<any>;
    width: number;
    height: number;
  }>({
    ctx: null,
    dots: [],
    width: 0,
    height: 0,
  });

  const play = useRef(false);
  useEffect(() => {
    play.current = true;

    if (myCanvas.current) {
      data.current.ctx = myCanvas.current.getContext('2d');
      if (data.current && data.current.ctx) {
        data.current.ctx.strokeStyle = 'rgba(255,255,255,1)';
        data.current.width = myCanvas.current.clientWidth;
        data.current.height = myCanvas.current.clientHeight;
        myCanvas.current.width = data.current.width;
        myCanvas.current.height = data.current.height;
        init(row, col, data.current.width, data.current.height);
        animate();
      }
    }

    return () => {
      play.current = false;
    };
  }, []);

  /** 工具 - 获取范围随机数 **/
  const random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  /** 初始化canvas **/
  const init = (row: number, col: number, width: number, height: number) => {
    const step_row = height / (row - 2);
    const step_col = width / (col - 2);
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        const temp = {
          x: j * step_col - step_col / 2, // 原始坐标x
          y: i * step_row - step_row / 2, // 原始坐标y
          sx: random(-step_row / 2, step_row / 2), // 当前偏移量x
          sy: random(-step_col / 2, step_col / 2), // 当前偏移量y
          dx: !!Math.round(random(0, 1)), // 当前方向x
          dy: !!Math.round(random(0, 1)), // 当前方向y
          color: random(20, 70), // b通道颜色值
          dcolor: !!Math.round(random(0, 1)), // 颜色改变向量
        };
        data.current.dots.push(temp);
      }
    }
  };

  /** 绘制一帧 **/
  const drow = useCallback(
    (
      dots: any[],
      row: number,
      col: number,
      ctx: any,
      width: any,
      height: any,
    ) => {
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col - 1; j++) {
          const k = i * col + j;
          const k1 = k + 1;
          const k2 = k + col;
          const k3 = k - col + 1;
          if (i <= row - 2) {
            ctx.beginPath();
            ctx.moveTo(dots[k].x + dots[k].sx, dots[k].y + dots[k].sy);
            ctx.lineTo(dots[k1].x + dots[k1].sx, dots[k1].y + dots[k1].sy);
            ctx.lineTo(dots[k2].x + dots[k2].sx, dots[k2].y + dots[k2].sy);
            ctx.closePath();
            const c = Math.round(
              (dots[k].color + dots[k1].color + dots[k2].color) / 3,
            );
            ctx.fillStyle = `rgb(${Math.round(c / 1.3)},6,${c})`;
            ctx.fill();
          }
          if (i > 0) {
            ctx.beginPath();
            ctx.moveTo(dots[k].x + dots[k].sx, dots[k].y + dots[k].sy);
            ctx.lineTo(dots[k1].x + dots[k1].sx, dots[k1].y + dots[k1].sy);
            ctx.lineTo(dots[k3].x + dots[k3].sx, dots[k3].y + dots[k3].sy);
            ctx.closePath();
            const c = Math.round(
              (dots[k].color + dots[k1].color + dots[k3].color) / 3,
            );
            ctx.fillStyle = `rgb( ${Math.round(c / 1.3)},6,${c})`;
            ctx.fill();
          }
        }
      }
    },
    [],
  );

  /** 动画函数 **/
  const animate = () => {
    const width = data.current.width;
    const height = data.current.height;
    const step_row = height / (row - 2);
    const step_col = width / (col - 2);

    data.current.dots.forEach(function (item: {
      dx: boolean;
      dy: boolean;
      sx: number;
      sy: number;
      dcolor: boolean;
      color: number;
    }) {
      if (item.dx) {
        // 增
        if (item.sx < step_col / 3) {
          item.sx += 0.1;
        } else {
          item.dx = !item.dx;
        }
      } else {
        // 减
        if (item.sx > -(step_col / 3)) {
          item.sx -= 0.1;
        } else {
          item.dx = !item.dx;
        }
      }

      if (item.dy) {
        // 增
        if (item.sy < step_row / 3) {
          item.sy += 0.1;
        } else {
          item.dy = !item.dy;
        }
      } else {
        // 减
        if (item.sy > -(step_row / 3)) {
          item.sy -= 0.1;
        } else {
          item.dy = !item.dy;
        }
      }

      /** 处理颜色变化 **/
      if (item.dcolor) {
        // 颜色变亮
        if (item.color < 80) {
          item.color += 0.4;
        } else {
          item.dcolor = !item.dcolor;
        }
      } else {
        if (item.color > 20) {
          item.color -= 0.4;
        } else {
          item.dcolor = !item.dcolor;
        }
      }
    });

    drow(data.current.dots, row, col, data.current.ctx, width, height);

    if (play.current) {
      requestAnimationFrame(animate);
    }
  };

  return (
    <div className="components-background">
      <canvas ref={myCanvas} />
    </div>
  );
}
