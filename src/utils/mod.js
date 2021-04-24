import {
  bold,
  red,
  green,
  yellow,
} from "https://deno.land/std@0.95.0/fmt/colors.ts";

export function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export function logger(msg, status = 200) {
  if (status >= 500) {
    console.log(red(bold(msg)));
  } else if (status >= 400) {
    console.log(yellow(bold(msg)));
  } else {
    console.log(green(bold(msg)));
  }
}
