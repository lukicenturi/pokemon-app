import { baseBlue, baseGreen, baseRed } from '@/variables';

export namespace CommonUtil {
  export const toTitleCase = (str: string) => {
    return str.replace(/\-/g, ' ').replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  export const getRandomColor = () => {
    const colors = [
      baseRed,
      baseGreen,
      baseBlue,
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

}
