import Svg, { Path, Rect } from "react-native-svg";

export const btnAdd = (
  <Svg width="13" height="13" viewBox="0 0 13 13">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7 0H6V6H0V7H6V13H7V7H13V6H7V0Z"
      fill="#FF6C00"
    />
  </Svg>
);

export const btnRemove = (
  <Svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.25736 0.550253L0.550258 1.25736L4.7929 5.5L0.550258 9.74264L1.25736 10.4497L5.50001 6.20711L9.74265 10.4497L10.4498 9.74264L6.20711 5.5L10.4498 1.25736L9.74265 0.550253L5.50001 4.79289L1.25736 0.550253Z"
      fill="#BDBDBD"
    />
  </Svg>
);

export const logOut = (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10"
      stroke="#BDBDBD"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M17 16L21 12L17 8"
      stroke="#BDBDBD"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M21 12H9"
      stroke="#BDBDBD"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export const grid = (color) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
      <Rect width="24" height="24" fill="transparent" />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 3H10V10H3V3Z"
        stroke={color}
        stroke-opacity="0.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 3H21V10H14V3Z"
        stroke={color}
        stroke-opacity="0.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 14H21V21H14V14Z"
        stroke={color}
        stroke-opacity="0.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 14H10V21H3V14Z"
        stroke={color}
        stroke-opacity="0.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const plus = (color) => {
  return (
    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.5 0.5H6.5V6.5H0.5V7.5H6.5V13.5H7.5V7.5H13.5V6.5H7.5V0.5Z"
        fill={color}
        fill-opacity="0.8"
      />
    </Svg>
  );
};

export const user = (color) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
        stroke={color}
        stroke-opacity="0.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        stroke={color}
        stroke-opacity="0.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
