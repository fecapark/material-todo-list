import "./shadow.scss";
import { Range } from "../Range/Range";

const MAX_SHADOW_LEVEL: number = 5;
const SHADOW_VALUE_DATAS: Record<string, Array<number>> = {
  "0": [0, 0, 0, 0, 0, 0],
  "1": [1, 3, 0.12, 1, 2, 0.24],
  "2": [3, 6, 0.16, 3, 6, 0.23],
  "3": [10, 20, 0.19, 6, 6, 0.23],
  "4": [14, 28, 0.25, 10, 10, 0.22],
  "5": [19, 38, 0.3, 15, 12, 0.22],
};

function removeShadow(element: HTMLElement) {
  element.classList.forEach((className) => {
    if (className.startsWith("shadow-lv-")) {
      element.classList.remove(className);
    }
  });
}

function setShadow(element: HTMLElement, toLv?: number) {
  if (typeof toLv === "undefined") {
    return;
  }

  if (new Range(toLv).lessThan(0).or().moreThan(MAX_SHADOW_LEVEL).isIn()) {
    throw Error("Invalid shadow level to change.");
  }

  removeShadow(element);

  if (toLv === 0) {
    return;
  }

  const sv: Array<number> = getShadowValue(toLv);
  element.style.boxShadow = `0 ${sv[0]}px ${sv[1]}px rgba(0, 0, 0, ${sv[2]}), 0 ${sv[3]}px ${sv[4]}px rgba(0, 0, 0, ${sv[5]})`;
}

function getShadowFormatValue(): string {
  return "0 %xpx %xpx rgba(0, 0, 0, %x), 0 %xpx %xpx rgba(0, 0, 0, %x)";
}

function getShadowValue(lv: number): Array<number> {
  return SHADOW_VALUE_DATAS[lv.toString()];
}

export { setShadow, removeShadow, getShadowFormatValue, getShadowValue };
