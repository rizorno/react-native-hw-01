import Svg, { Path, Rect, Defs, ClipPath, G, Circle } from "react-native-svg";

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

export const camera = (bg, color) => {
  return (
    <Svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <Circle cx="30" cy="30" r="30" fill={bg} />
      <G clip-path="url(#clip0_32_29)">
        <Path
          d="M29.9998 33.2C31.7671 33.2 33.1998 31.7673 33.1998 30C33.1998 28.2327 31.7671 26.8 29.9998 26.8C28.2325 26.8 26.7998 28.2327 26.7998 30C26.7998 31.7673 28.2325 33.2 29.9998 33.2Z"
          fill={color}
        />
        <Path
          d="M27 20L25.17 22H22C20.9 22 20 22.9 20 24V36C20 37.1 20.9 38 22 38H38C39.1 38 40 37.1 40 36V24C40 22.9 39.1 22 38 22H34.83L33 20H27ZM30 35C27.24 35 25 32.76 25 30C25 27.24 27.24 25 30 25C32.76 25 35 27.24 35 30C35 32.76 32.76 35 30 35Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_32_29">
          <Rect
            width="24"
            height="24"
            fill="#ffffff"
            transform="translate(18 18)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const local = (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20 10.3636C20 16.0909 12 21 12 21C12 21 4 16.0909 4 10.3636C4 6.29681 7.58172 3 12 3C16.4183 3 20 6.29681 20 10.3636V10.3636Z"
      stroke="#BDBDBD"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
      stroke="#BDBDBD"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export const trash = (color) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6H5H21"
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M19.5 6C19.5 5.72386 19.2761 5.5 19 5.5C18.7239 5.5 18.5 5.72386 18.5 6H19.5ZM5.5 6C5.5 5.72386 5.27614 5.5 5 5.5C4.72386 5.5 4.5 5.72386 4.5 6H5.5ZM7.5 6C7.5 6.27614 7.72386 6.5 8 6.5C8.27614 6.5 8.5 6.27614 8.5 6H7.5ZM15.5 6C15.5 6.27614 15.7239 6.5 16 6.5C16.2761 6.5 16.5 6.27614 16.5 6H15.5ZM18.5 6V20H19.5V6H18.5ZM18.5 20C18.5 20.8284 17.8284 21.5 17 21.5V22.5C18.3807 22.5 19.5 21.3807 19.5 20H18.5ZM17 21.5H7V22.5H17V21.5ZM7 21.5C6.17157 21.5 5.5 20.8284 5.5 20H4.5C4.5 21.3807 5.61929 22.5 7 22.5V21.5ZM5.5 20V6H4.5V20H5.5ZM8.5 6V4H7.5V6H8.5ZM8.5 4C8.5 3.17157 9.17157 2.5 10 2.5V1.5C8.61929 1.5 7.5 2.61929 7.5 4H8.5ZM10 2.5H14V1.5H10V2.5ZM14 2.5C14.8284 2.5 15.5 3.17157 15.5 4H16.5C16.5 2.61929 15.3807 1.5 14 1.5V2.5ZM15.5 4V6H16.5V4H15.5Z"
      fill={color}
    />
    <Path
      d="M10 11V17"
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M14 11V17"
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export const comment = (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1 9.5C0.996559 10.8199 1.30493 12.1219 1.9 13.3C3.33904 16.1793 6.28109 17.9988 9.5 18C10.8199 18.0034 12.1219 17.6951 13.3 17.1L19 19L17.1 13.3C17.6951 12.1219 18.0034 10.8199 18 9.5C17.9988 6.28109 16.1793 3.33904 13.3 1.9C12.1219 1.30493 10.8199 0.996557 9.5 0.999998H9C4.68419 1.2381 1.2381 4.68419 1 9V9.5V9.5Z"
      stroke="#BDBDBD"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export const arrowLeft = (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 12H4"
      stroke="#212121"
      stroke-opacity="0.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10 18L4 12L10 6"
      stroke="#212121"
      stroke-opacity="0.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export const btnSend = (
  <Svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <Circle cx="17" cy="17" r="17" fill="#FF6C00" />
    <Path
      d="M17 10L17.3536 9.64645C17.1583 9.45118 16.8417 9.45118 16.6464 9.64645L17 10ZM21.6464 15.3536C21.8417 15.5488 22.1583 15.5488 22.3536 15.3536C22.5488 15.1583 22.5488 14.8417 22.3536 14.6464L21.6464 15.3536ZM11.6464 14.6464C11.4512 14.8417 11.4512 15.1583 11.6464 15.3536C11.8417 15.5488 12.1583 15.5488 12.3536 15.3536L11.6464 14.6464ZM16.5 24C16.5 24.2761 16.7239 24.5 17 24.5C17.2761 24.5 17.5 24.2761 17.5 24H16.5ZM16.6464 10.3536L21.6464 15.3536L22.3536 14.6464L17.3536 9.64645L16.6464 10.3536ZM16.6464 9.64645L11.6464 14.6464L12.3536 15.3536L17.3536 10.3536L16.6464 9.64645ZM16.5 10V17H17.5V10H16.5ZM16.5 17V24H17.5V17H16.5Z"
      fill="white"
    />
  </Svg>
);
