import React from "react";

const fingerTargets = {
  left: [
    { id: "left-thumb", label: "Thumb", fullName: "Left Thumb", cx: 76, cy: 235 },
    { id: "left-index", label: "Index", fullName: "Left Index", cx: 145, cy: 92 },
    { id: "left-middle", label: "Middle", fullName: "Left Middle", cx: 205, cy: 65 },
    { id: "left-ring", label: "Ring", fullName: "Left Ring", cx: 265, cy: 100 },
    { id: "left-little", label: "Little", fullName: "Left Little", cx: 320, cy: 170 },
  ],
  right: [
    { id: "right-little", label: "Little", fullName: "Right Little", cx: 70, cy: 170 },
    { id: "right-ring", label: "Ring", fullName: "Right Ring", cx: 125, cy: 100 },
    { id: "right-middle", label: "Middle", fullName: "Right Middle", cx: 185, cy: 65 },
    { id: "right-index", label: "Index", fullName: "Right Index", cx: 245, cy: 92 },
    { id: "right-thumb", label: "Thumb", fullName: "Right Thumb", cx: 314, cy: 235 },
  ],
};

export default function InteractiveHand({
  hand = "left",
  selectedFinger,
  onSelect,
  disabled = false,
}) {
  const isRight = hand === "right";
  const fingers = fingerTargets[hand];

  return (
    <div className="relative w-full max-w-[390px] mx-auto">
      <svg
        viewBox="0 0 390 430"
        className="w-full h-auto drop-shadow-2xl"
        role="img"
        aria-label={`${hand} hand fingerprint selector`}
      >
        <defs>
          <linearGradient id={`handSkin-${hand}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0a06a" />
            <stop offset="45%" stopColor="#b96a36" />
            <stop offset="100%" stopColor="#6f3517" />
          </linearGradient>

          <linearGradient id={`fingerSkin-${hand}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e9aa73" />
            <stop offset="50%" stopColor="#bf7139" />
            <stop offset="100%" stopColor="#7a3d1b" />
          </linearGradient>

          <filter id={`softShadow-${hand}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.35" />
          </filter>
        </defs>

        <g filter={`url(#softShadow-${hand})`}>
          <path
            d={
              isRight
                ? "M145 385 C105 365 82 330 81 286 L80 236 C79 216 100 205 117 219 L120 132 C121 105 153 103 158 130 L162 91 C166 59 202 59 207 91 L211 129 C216 102 248 105 251 132 L254 217 L274 174 C283 152 312 160 313 185 C315 215 300 252 287 280 C276 304 272 330 270 352 C266 384 207 407 145 385 Z"
                : "M245 385 C285 365 308 330 309 286 L310 236 C311 216 290 205 273 219 L270 132 C269 105 237 103 232 130 L228 91 C224 59 188 59 183 91 L179 129 C174 102 142 105 139 132 L136 217 L116 174 C107 152 78 160 77 185 C75 215 90 252 103 280 C114 304 118 330 120 352 C124 384 183 407 245 385 Z"
            }
            fill={`url(#handSkin-${hand})`}
            stroke="#f1b37c"
            strokeOpacity="0.35"
            strokeWidth="3"
          />

          <path
            d={
              isRight
                ? "M113 293 C130 323 158 339 194 338 C231 337 259 320 277 290"
                : "M277 293 C260 323 232 339 196 338 C159 337 131 320 113 290"
            }
            fill="none"
            stroke="#ffd0a3"
            strokeOpacity="0.18"
            strokeWidth="4"
          />

          <path
            d={
              isRight
                ? "M158 131 C169 149 174 176 174 216 M207 92 C213 131 214 172 213 218 M251 133 C252 161 250 191 248 221"
                : "M232 131 C221 149 216 176 216 216 M183 92 C177 131 176 172 177 218 M139 133 C138 161 140 191 142 221"
            }
            fill="none"
            stroke="#6f3517"
            strokeOpacity="0.18"
            strokeWidth="3"
          />
        </g>

        {fingers.map((finger) => {
          const isSelected = selectedFinger?.id === finger.id;

          return (
            <g key={finger.id}>
              <text
                x={finger.cx}
                y={finger.cy - 34}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="15"
                fontWeight="800"
              >
                {finger.label}
              </text>

              <circle
                cx={finger.cx}
                cy={finger.cy}
                r={21}
                fill={isSelected ? "#2563eb" : "#06254a"}
                stroke={isSelected ? "#bfdbfe" : "#60a5fa"}
                strokeWidth="4"
                opacity={disabled && !isSelected ? "0.35" : "1"}
                style={{ cursor: disabled && !isSelected ? "not-allowed" : "pointer" }}
                onClick={() => {
                  if (disabled && !isSelected) return;
                  onSelect(finger);
                }}
              />

              <circle
                cx={finger.cx}
                cy={finger.cy}
                r={6}
                fill="#ffffff"
                opacity={disabled && !isSelected ? "0.35" : "1"}
                style={{ cursor: disabled && !isSelected ? "not-allowed" : "pointer" }}
                onClick={() => {
                  if (disabled && !isSelected) return;
                  onSelect(finger);
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}