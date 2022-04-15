<template>
  <div class="mt-3">
    <div class="row">
      <div class="col-12 text-left">
        <h6>{{ it["o:title"] }}</h6>
      </div>
    </div>

    <div class="row text-left">
      <div class="col-12">
        <i class="bi bi-clock mr-2"></i>{{ it["geo:Durata"][0]["@value"] }}
        minuti
      </div>
    </div>

    <div class="row text-left">
      <div class="col-12 font-italic">
        Livello di difficoltà:

        <svg
          v-if="
            it['geo:ha_difficolta'][0]['display_title'] ===
            'Scuola dell\'Infanzia'
          "
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="30px"
          height="29px"
          viewBox="0 0 50 40"
          version="1.1"
        >
          <g id="scuolaDellInfanzia">
            <path
              style="
                fill-rule: nonzero;
                fill: rgb(0, 0, 0);
                fill-opacity: 1;
                stroke-width: 3;
                stroke-linecap: butt;
                stroke-linejoin: miter;
                stroke: rgb(0, 0, 0);
                stroke-opacity: 1;
                stroke-miterlimit: 4;
              "
              d="M 15.011734 156.007543 L 66.992254 156.007543 L 66.992254 185.991379 L 15.011734 185.991379 Z M 15.011734 156.007543 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: rgb(0, 0, 0);
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 78.011797 126.993534 L 129.992317 126.993534 L 129.992317 185.991379 L 78.011797 185.991379 Z M 78.011797 126.993534 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: rgb(0, 0, 0);
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 143.992331 98.006466 L 196.000196 98.006466 L 196.000196 184.994612 L 143.992331 184.994612 Z M 143.992331 98.006466 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: rgb(0, 0, 0);
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 211.01193 65.005388 L 262.99245 65.005388 L 262.99245 183.997845 L 211.01193 183.997845 Z M 211.01193 65.005388 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: rgb(0, 0, 0);
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 278.98856 18.992457 L 330.996425 18.992457 L 330.996425 182.00431 L 278.98856 182.00431 Z M 278.98856 18.992457 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
          </g>
        </svg>

        <svg
          v-else-if="
            it['geo:ha_difficolta'][0]['display_title'] === 'Scuola Primaria'
          "
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="30px"
          height="29px"
          viewBox="0 0 50 40"
          version="1.1"
        >
          <g id="scuolaPrimaria">
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 3;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 15.011734 156.007543 L 66.992254 156.007543 L 66.992254 185.991379 L 15.011734 185.991379 Z M 15.011734 156.007543 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                fill-rule: nonzero;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 6;
                stroke-linecap: butt;
                stroke-linejoin: miter;
                stroke: #000000;
                stroke-opacity: 1;
                stroke-miterlimit: 4;
              "
              d="M 78.011797 126.993534 L 129.992317 126.993534 L 129.992317 185.991379 L 78.011797 185.991379 Z M 78.011797 126.993534 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 143.992331 98.006466 L 196.000196 98.006466 L 196.000196 184.994612 L 143.992331 184.994612 Z M 143.992331 98.006466 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 211.01193 65.005388 L 262.99245 65.005388 L 262.99245 183.997845 L 211.01193 183.997845 Z M 211.01193 65.005388 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 278.98856 18.992457 L 330.996425 18.992457 L 330.996425 182.00431 L 278.98856 182.00431 Z M 278.98856 18.992457 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
          </g>
        </svg>

        <svg
          v-else-if="
            it['geo:ha_difficolta'][0]['display_title'] ===
            'Scuola Secondaria di Primo Grado'
          "
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="30px"
          height="29px"
          viewBox="0 0 50 40"
          version="1.1"
        >
          <g id="scuolaSecondariaDiPrimoGrado">
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 3;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 15.011734 156.007543 L 66.992254 156.007543 L 66.992254 185.991379 L 15.011734 185.991379 Z M 15.011734 156.007543 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 78.011797 126.993534 L 129.992317 126.993534 L 129.992317 185.991379 L 78.011797 185.991379 Z M 78.011797 126.993534 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                fill-rule: nonzero;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 6;
                stroke-linecap: butt;
                stroke-linejoin: miter;
                stroke: #000000;
                stroke-opacity: 1;
                stroke-miterlimit: 4;
              "
              d="M 143.992331 98.006466 L 196.000196 98.006466 L 196.000196 184.994612 L 143.992331 184.994612 Z M 143.992331 98.006466 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 211.01193 65.005388 L 262.99245 65.005388 L 262.99245 183.997845 L 211.01193 183.997845 Z M 211.01193 65.005388 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 278.98856 18.992457 L 330.996425 18.992457 L 330.996425 182.00431 L 278.98856 182.00431 Z M 278.98856 18.992457 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
          </g>
        </svg>

        <svg
          v-else-if="
            it['geo:ha_difficolta'][0]['display_title'] ===
            'Scuola Secondaria di Secondo Grado'
          "
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="30px"
          height="29px"
          viewBox="0 0 50 40"
          version="1.1"
        >
          <g id="scuolaSecondariaDiSecondoGrado">
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 3;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 15.011734 156.007543 L 66.992254 156.007543 L 66.992254 185.991379 L 15.011734 185.991379 Z M 15.011734 156.007543 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 78.011797 126.993534 L 129.992317 126.993534 L 129.992317 185.991379 L 78.011797 185.991379 Z M 78.011797 126.993534 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 143.992331 98.006466 L 196.000196 98.006466 L 196.000196 184.994612 L 143.992331 184.994612 Z M 143.992331 98.006466 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                fill-rule: nonzero;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 6;
                stroke-linecap: butt;
                stroke-linejoin: miter;
                stroke: #000000;
                stroke-opacity: 1;
                stroke-miterlimit: 4;
              "
              d="M 211.01193 65.005388 L 262.99245 65.005388 L 262.99245 183.997845 L 211.01193 183.997845 Z M 211.01193 65.005388 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 278.98856 18.992457 L 330.996425 18.992457 L 330.996425 182.00431 L 278.98856 182.00431 Z M 278.98856 18.992457 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
          </g>
        </svg>

        <svg
          v-else-if="
            it['geo:ha_difficolta'][0]['display_title'] === 'Università'
          "
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="30px"
          height="29px"
          viewBox="0 0 50 40"
          version="1.1"
        >
          <g id="Universita">
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 3;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 15.011734 156.007543 L 66.992254 156.007543 L 66.992254 185.991379 L 15.011734 185.991379 Z M 15.011734 156.007543 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 78.011797 126.993534 L 129.992317 126.993534 L 129.992317 185.991379 L 78.011797 185.991379 Z M 78.011797 126.993534 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 143.992331 98.006466 L 196.000196 98.006466 L 196.000196 184.994612 L 143.992331 184.994612 Z M 143.992331 98.006466 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                                                        fill-rule: nonzero;
                                                        fill: #FFFFFF
                                                        fill-opacity: 1;
                                                        stroke-width: 6;
                                                        stroke-linecap: butt;
                                                        stroke-linejoin: miter;
                                                        stroke: #000000;
                                                        stroke-opacity: 1;
                                                        stroke-miterlimit: 4;
                                                      "
              d="M 211.01193 65.005388 L 262.99245 65.005388 L 262.99245 183.997845 L 211.01193 183.997845 Z M 211.01193 65.005388 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
            <path
              style="
                fill-rule: nonzero;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 6;
                stroke-linecap: butt;
                stroke-linejoin: miter;
                stroke: #000000;
                stroke-opacity: 1;
                stroke-miterlimit: 4;
              "
              d="M 278.98856 18.992457 L 330.996425 18.992457 L 330.996425 182.00431 L 278.98856 182.00431 Z M 278.98856 18.992457 "
              transform="matrix(0.142857,0,0,0.145,0,0)"
            />
          </g>
        </svg>

        <svg
          v-else-if="
            it['geo:ha_difficolta'][0]['display_title'] === 'Per Tutti'
          "
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="23px"
          height="50px"
          viewBox="0 5 55 40"
          version="1.1"
        >
          <g id="perTutti">
            <path
              style="
                stroke: none;
                fill-rule: nonzero;
                fill: rgb(0%, 0%, 0%);
                fill-opacity: 1;
              "
              d="M 15.78125 4.140625 C 12.1875 7.96875 15 14.84375 20.078125 14.84375 C 25.625 14.765625 28.515625 8.125 24.609375 4.296875 C 22.109375 1.71875 18.125 1.640625 15.78125 4.140625 Z M 15.78125 4.140625 "
            />
            <path
              style="
                stroke: none;
                fill-rule: nonzero;
                fill: rgb(0%, 0%, 0%);
                fill-opacity: 1;
              "
              d="M 38.28125 8.359375 C 36.25 9.140625 34.375 11.09375 34.375 12.578125 C 34.375 13.359375 35.15625 15.15625 36.171875 16.71875 C 37.5 18.90625 38.4375 19.453125 40.3125 19.53125 C 46.796875 19.609375 47.421875 10 41.015625 8.359375 C 40.15625 8.125 38.90625 8.125 38.28125 8.359375 Z M 38.28125 8.359375 "
            />
            <path
              style="
                stroke: none;
                fill-rule: nonzero;
                fill: rgb(0%, 0%, 0%);
                fill-opacity: 1;
              "
              d="M 6.875 15.15625 C 4.6875 16.796875 3.90625 19.6875 5.078125 22.34375 C 6.953125 26.796875 11.5625 27.109375 13.984375 22.96875 C 16.171875 19.296875 16.015625 17.65625 13.59375 15.703125 C 11.25 13.828125 8.828125 13.671875 6.875 15.15625 Z M 6.875 15.15625 "
            />
            <path
              style="
                stroke: none;
                fill-rule: nonzero;
                fill: rgb(0%, 0%, 0%);
                fill-opacity: 1;
              "
              d="M 27.109375 14.921875 C 26.328125 15.390625 25.3125 16.640625 24.921875 17.734375 C 24.296875 19.375 24.453125 20.078125 25.625 21.40625 C 26.484375 22.34375 27.34375 23.671875 27.578125 24.375 C 28.28125 26.25 31.328125 26.171875 33.90625 24.140625 C 39.296875 19.921875 33.125 11.40625 27.109375 14.921875 Z M 27.109375 14.921875 "
            />
            <path
              style="
                stroke: none;
                fill-rule: nonzero;
                fill: rgb(0%, 0%, 0%);
                fill-opacity: 1;
              "
              d="M 16.484375 17.421875 C 17.1875 18.90625 17.734375 19.140625 20.15625 18.90625 C 22.8125 18.59375 24.140625 17.65625 24.21875 16.171875 C 24.21875 15.859375 22.265625 15.625 19.921875 15.625 C 15.78125 15.625 15.703125 15.703125 16.484375 17.421875 Z M 16.484375 17.421875 "
            />
            <path
              style="
                stroke: none;
                fill-rule: nonzero;
                fill: rgb(0%, 0%, 0%);
                fill-opacity: 1;
              "
              d="M 16.5625 21.875 C 14.140625 24.140625 14.21875 28.28125 16.796875 30.3125 L 18.671875 31.796875 L 15.546875 33.046875 C 12.03125 34.453125 10.15625 37.8125 10.15625 42.890625 C 10.15625 45.9375 10.3125 46.09375 13.515625 46.953125 C 16.875 47.8125 27.890625 47.578125 29.53125 46.5625 C 30.078125 46.25 30.46875 44.21875 30.46875 41.796875 C 30.46875 36.796875 28.125 33.359375 24.0625 32.421875 C 21.5625 31.953125 21.5625 31.875 23.203125 31.09375 C 25.390625 30 26.71875 26.328125 25.78125 23.828125 C 24.375 20.234375 19.53125 19.140625 16.5625 21.875 Z M 16.5625 21.875 "
            />
            <path
              style="
                stroke: none;
                fill-rule: nonzero;
                fill: rgb(0%, 0%, 0%);
                fill-opacity: 1;
              "
              d="M 36.484375 22.96875 C 35.3125 25.546875 35.3125 25.703125 36.71875 26.171875 C 38.984375 26.875 41.40625 30.703125 41.40625 33.515625 C 41.40625 36.25 41.640625 36.328125 46.5625 35.078125 L 50 34.21875 L 50 30.390625 C 50 23.515625 47.03125 20.3125 40.78125 20.3125 C 38.125 20.3125 37.65625 20.625 36.484375 22.96875 Z M 36.484375 22.96875 "
            />
            <path
              style="
                stroke: none;
                fill-rule: nonzero;
                fill: rgb(0%, 0%, 0%);
                fill-opacity: 1;
              "
              d="M 2.65625 28.359375 C 0.859375 29.921875 0.46875 31.015625 0.15625 34.921875 C 0 37.734375 0.15625 39.84375 0.625 40.15625 C 1.09375 40.390625 3.046875 40.859375 4.921875 41.09375 L 8.515625 41.640625 L 9.375 38.359375 C 10.234375 35.15625 12.109375 32.578125 14.0625 31.875 C 14.921875 31.640625 14.921875 31.09375 13.984375 29.0625 C 12.96875 26.71875 12.65625 26.5625 8.828125 26.5625 C 5.703125 26.5625 4.296875 26.953125 2.65625 28.359375 Z M 2.65625 28.359375 "
            />
            <path
              style="
                stroke: none;
                fill-rule: nonzero;
                fill: rgb(0%, 0%, 0%);
                fill-opacity: 1;
              "
              d="M 27.109375 27.890625 C 26.953125 28.671875 26.484375 29.921875 26.171875 30.625 C 25.78125 31.640625 26.015625 32.03125 26.796875 32.03125 C 28.515625 32.03125 31.09375 35.625 31.71875 38.75 C 32.109375 41.015625 32.5 41.40625 34.375 41.40625 C 38.515625 41.40625 40.625 40.078125 40.625 37.578125 C 40.625 33.4375 39.6875 30.546875 37.65625 28.515625 C 36.09375 26.953125 35 26.5625 31.640625 26.5625 C 28.359375 26.5625 27.421875 26.875 27.109375 27.890625 Z M 27.109375 27.890625 "
            />
          </g>
        </svg>
      </div>
    </div>

    <div class="row text-left">
      <div class="col-12">
        <collapse>
          <collapse-item title="Più dettagli">
            <div
              style="text-align: justify; text-justify: inter-word"
              class="font-weight-normal pb-0"
            >
              {{ it["dcterms:description"][0]["@value"] }}
            </div>
          </collapse-item>
        </collapse>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Checkbox,
  Collapse,
  CollapseItem,
  Radio,
  Card,
  Modal,
  FormGroupInput,
} from "../";

export default {
  name: "activitiesOfPOI",
  props: ["it"],
  components: {
    Collapse,
    CollapseItem,
    //Collapsible
  },
  data() {
    return {};
  },

  mounted() {
    console.log("IT");
    console.log(this.it);
  },
};
</script>
<style >
.ulDiffIcons {
  margin-bottom: 0px;
  padding-bottom: 0px;
}

ul#difficultiesLevelIcons li {
  display: inline;
}

.difficultiesLevelsIcons {
  padding-right: 0.2rem;
  margin-right: 0rem;
}

.card-body {
  padding-bottom: 0 !important;
}

#headingOne.card-header {
  padding-left: 0px !important;
}

.card-header {
  padding-left: 0px !important;
}

.card-plain .card-body,
.card-plain .card-header {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
