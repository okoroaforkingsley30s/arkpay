import React from "react";

const fingerTargets = {
  left: [
    { id: "left-thumb", label: "Thumb", fullName: "Left Thumb", cx: 70, cy: 246 },
    { id: "left-index", label: "Index", fullName: "Left Index", cx: 145, cy: 118 },
    { id: "left-middle", label: "Middle", fullName: "Left Middle", cx: 198, cy: 82 },
    { id: "left-ring", label: "Ring", fullName: "Left Ring", cx: 252, cy: 118 },
    { id: "left-little", label: "Little", fullName: "Left Little", cx: 305, cy: 190 },
  ],
  right: [
    { id: "right-little", label: "Little", fullName: "Right Little", cx: 85, cy: 190 },
    { id: "right-ring", label: "Ring", fullName: "Right Ring", cx: 138, cy: 118 },
    { id: "right-middle", label: "Middle", fullName: "Right Middle", cx: 192, cy: 82 },
    { id: "right-index", label: "Index", fullName: "Right Index", cx: 245, cy: 118 },
    { id: "right-thumb", label: "Thumb", fullName: "Right Thumb", cx: 320, cy: 246 },
  ],
};

const handPaths = {
  left:
    "M 190 360 C 142 360 106 328 104 282 L 101 238 C 100 221 114 214 128 225 L 141 244 L 141 143 C 141 126 163 124 167 141 L 170 205 L 180 102 C 183 82 209 82 212 102 L 212 205 L 224 143 C 228 124 251 126 251 145 L 244 214 L 260 173 C 267 157 289 160 290 179 C 292 209 279 243 266 273 C 254 301 250 324 248 343 C 246 356 223 360 190 360 Z",
  right:
    "M 200 360 C 248 360 284 328 286 282 L 289 238 C 290 221 276 214 262 225 L 249 244 L 249 143 C 249 126 227 124 223 141 L 220 205 L 210 102 C 207 82 181 82 178 102 L 178 205 L 166 143 C 162 124 139 126 139 145 L 146 214 L 130 173 C 123 157 101 160 100 179 C 98 209 111 243 124 273 C 136 301 140 324 142 343 C 144 356 167 360 200 360 Z",
};

const palmLines = {
  left: [
    "M 126 282 C 146 315 173 330 204 328",
    "M 143 246 C 154 264 160 285 159 306",
    "M 176 218 C 185 245 188 275 184 310",
    "M 221 220 C 215 248 214 280 220 312",
  ],
  right: [
    "M 264 282 C 244 315 217 330 186 328",
    "M 247 246 C 236 264 230 285 231 306",
    "M 214 218 C 205 245 202 275 206 310",
    "M 169 220 C 175 248 176 280 170 312",
  ],
};

export default function InteractiveHand({
  hand = "left",
  selectedFinger,
  onSelect,
  disabled = false,
}) {
  const fingers = fingerTargets[hand];
  const path = handPaths[hand];
  const lines = palmLines[hand];

  return (
    <div className="relative w-full max-w-[390px] mx-auto">
      <svg
        viewBox="0 0 390 430"
        className="w-full h-auto"
        role="img"
        aria-label={`${hand} hand fingerprint selector`}
      >
        <defs>
          <filter id={`blueGlow-${hand}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="4"
              floodColor="#3b82f6"
              floodOpacity="0.6"
            />
          </filter>
        </defs>

        <path
          d={path}
          fill="#071b34"
          fillOpacity="0.65"
          stroke="#3b82f6"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#blueGlow-${hand})`}
        />

        {lines.map((line) => (
          <path
            key={line}
            d={line}
            fill="none"
            stroke="#60a5fa"
            strokeOpacity="0.35"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}

        {fingers.map((finger) => {
          const isSelected = selectedFinger?.id === finger.id;
          const isDisabled = disabled && !isSelected;

          return (
            <g
              key={finger.id}
              opacity={isDisabled ? "0.35" : "1"}
              style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
              onClick={() => {
                if (isDisabled) return;
                onSelect(finger);
              }}
            >
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
                r={23}
                fill={isSelected ? "#2563eb" : "#06254a"}
                stroke={isSelected ? "#bfdbfe" : "#60a5fa"}
                strokeWidth="4"
                filter={isSelected ? `url(#blueGlow-${hand})` : undefined}
              />

              <circle cx={finger.cx} cy={finger.cy} r={7} fill="#ffffff" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}