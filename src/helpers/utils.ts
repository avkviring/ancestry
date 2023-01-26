import type { CSSProperties } from "react";
import { StateType } from "react-zoom-pan-pinch";
import { NODE_HEIGHT, NODE_WIDTH } from "../data/const";
import { ExtendedNode } from "../types/family";

export function getNodeStyle({
  left,
  top,
}: Readonly<ExtendedNode>): CSSProperties {
  return {
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    transform: `translate(${left * (NODE_WIDTH / 2)}px, ${
      top * (NODE_HEIGHT / 2)
    }px)`,
  };
}

export const firstLetter = (string?: string) => {
  if (!string) return;

  return `${string[0]}.`;
};

export const getCenterPosition = (
  scale: number,
  wrapperComponent: HTMLDivElement,
  contentComponent: HTMLDivElement
): StateType => {
  const contentWidth = contentComponent.offsetWidth * scale;
  const contentHeight = contentComponent.offsetHeight * scale;

  const centerPositionX = (wrapperComponent.offsetWidth - contentWidth) / 2;
  const centerPositionY = (wrapperComponent.offsetHeight - contentHeight) / 2;

  return {
    scale,
    positionX: centerPositionX,
    positionY: centerPositionY,
  };
};

// Функция throttle будет принимать 2 аргумента:
// - callee, функция, которую надо вызывать;
// - timeout, интервал в мс, с которым следует пропускать вызовы.
export function throttle(callee: Function, timeout: number) {
  // Таймер будет определять,
  // надо ли нам пропускать текущий вызов.
  let timer: ReturnType<typeof setTimeout> | null = null;

  // Как результат возвращаем другую функцию.
  // Это нужно, чтобы мы могли не менять другие части кода,
  // чуть позже мы увидим, как это помогает.
  return function perform(...args: any[]) {
    // Если таймер есть, то функция уже была вызвана,
    // и значит новый вызов следует пропустить.
    if (timer) return;

    // Если таймера нет, значит мы можем вызвать функцию:
    timer = setTimeout(() => {
      // Аргументы передаём неизменными в функцию-аргумент:
      callee(...args);

      // По окончании очищаем таймер:
      timer && clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
