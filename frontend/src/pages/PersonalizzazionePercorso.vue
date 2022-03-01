<template>
  <div>
    <div class="row">
      <div class="col-12">
        <!--TODO: sistemare pagine e step-->
        <i
          class="bi bi-arrow-left ml-3"
          style="font-size: 2rem; color: black; cursor: pointer"
          v-on:click="goBack()"
        ></i>
        <h4 class="text-center mt-0">
          <b>{{ stepTitle[currentStep].pageTitle }}</b>
          <!--{{ $store.state.timeAvailable.milliseconds }} -
          {{ totalTimeMillisecondsItinerario }} ; tempo rimanente:
          {{ remainingTime }}-->
        </h4>
      </div>
    </div>
    <div v-if="currentStep === 1">
      <div class="row px-3 mb-3">
        <div class="col-12">
          <div class="row">
            <div class="col-12 text-center">
              <h6>
                <b>Tempo totale a disposizione: </b>
                {{ $store.state.timeAvailable.hour }} ore e
                {{ $store.state.timeAvailable.minutes }} minuti
              </h6>
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-center">
              <h6>
                <b>Tempo a disposizione rimanente: </b>
                {{ remainingTimeHourAndMinutes.hours }} ore e
                {{ remainingTimeHourAndMinutes.minutes }} minuti
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div class="row px-3">
        <div class="col-lg-2 border-right">
          <div class="row">
            <div class="col-lg-12">
              <h5 class="mt-0"><b>Attività presenti nell'itinerario</b></h5>
              <!--<i class="bi-alarm" style="font-size: 2rem; color: cornflowerblue;"></i>-->
              <div v-if="someActivitiesSelected" class="mb-4">
                <div
                  v-for="(item, index) in this.filteredPOI"
                  :key="'availableActivitiesPOI' + (index + 200)"
                >
                  <div
                    v-for="(it, ind) in item.mis"
                    :key="'availableActivities' + (ind + 200)"
                    class="pl-2"
                  >
                    <div
                      v-if="
                        item.poiName !== 'Punto di partenza' &&
                        item.poiName !== 'Punto di arrivo' &&
                        it.insertedInItinerary
                      "
                    >
                      <!-- v-if="it.selected"-->
                      <div class="row border-bottom py-2 mr-1">
                        <div class="col-2">
                          <i
                            class="bi bi-trash"
                            style="
                              cursor: pointer;
                              color: indianred;
                              font-size: 1.2rem;
                            "
                            @click="
                              changeSelection(
                                item['geo:Titolo_it'][0]['@value'],
                                it['o:title']
                              )
                            "
                          ></i>
                        </div>
                        <div class="col-10 text-left">
                          {{ it["o:title"] }} ({{
                            item["geo:Titolo_it"][0]["@value"]
                          }}) (durata
                          {{ it["geo:Durata"][0]["@value"] }} minuti)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="mb-4">Nessuna attività selezionata</div>
            </div>
          </div>
        </div>

        <div class="col-lg-10">
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-6">
                  <div class="row">
                    <div class="col-12">
                      <h5 class="mt-0">
                        <b
                          >Elenco dei luoghi e delle attività che puoi
                          aggiungere</b
                        >
                      </h5>
                      <!--state.POIpivot-->
                      <div class="mb-4">
                        <div v-if="somePOIVisible">
                          <div
                            v-for="(item, index) in this.filteredPOI"
                            :key="'filteredPOI' + (index + 300)"
                          >
                            <collapse
                              v-if="item.hasActivitiesAvailableForRemainingTime"
                            >
                              <!--
                              <div v-for="">
                                <i class="bi bi-reception-4"></i>
                              </div>
                              -->

                              <collapse-item
                                :title="item['geo:Titolo_it'][0]['@value']"
                                name="1"
                                class="test"
                                style="color: black"
                              >
                                <div v-if="item['mis'].length > 0">
                                  <!--questo v-if non ha molto senso: il POI non viene proprio mostrato se non ci sono attività visibili-->
                                  <div v-if="item.poiVisibleWithFilters">
                                    <div
                                      v-for="(it, ind) in item.mis"
                                      :key="
                                        'filteredPOIactivities' + (ind + 300)
                                      "
                                      class="pl-3"
                                    >
                                      <div
                                        v-if="
                                          !it.insertedInItinerary &&
                                          it['geo:Durata'][0]['@value'] *
                                            60000 <
                                            remainingTime
                                        "
                                      >
                                        <div
                                          class="
                                            row
                                            mt-0
                                            border-bottom
                                            py-2
                                            text-center
                                            align-middle
                                          "
                                        >
                                          <div class="col-1">
                                            <!--<div v-if="it.selected">
                                              <i
                                                class="
                                                  bi bi-bookmark-check-fill
                                                "
                                                style="
                                                  font-size: 1.3rem;
                                                  color: cornflowerblue;
                                                  cursor: pointer;
                                                "
                                                v-on:click="
                                                  changeSelection(
                                                    item['geo:Titolo_it'][0][
                                                      '@value'
                                                    ],
                                                    it['o:title']
                                                  )
                                                "
                                              ></i>
                                            </div>-->
                                            <div>
                                              <i
                                                class="bi bi-bookmark-check"
                                                style="
                                                  font-size: 1.3rem;
                                                  color: cornflowerblue;
                                                  cursor: pointer;
                                                "
                                                v-on:click="
                                                  changeSelection(
                                                    item['geo:Titolo_it'][0][
                                                      '@value'
                                                    ],
                                                    it['o:title']
                                                  )
                                                "
                                              ></i>
                                            </div>
                                          </div>

                                          <div class="col-5 text-left">
                                            {{ it["o:title"] }} (durata
                                            {{ it["geo:Durata"][0]["@value"] }}
                                            minuti)
                                          </div>

                                          <div class="col-6 text-right">
                                            <!--TODO: sistemare la key-->

                                            <ul
                                              id="difficultiesLevelIcons"
                                              class="ulDiffIcons"
                                            >
                                              <li
                                                v-for="(
                                                  difficulty, index
                                                ) in it['geo:ha_difficolta']"
                                                :key="
                                                  'geo:ha_difficolta' + index
                                                "
                                                class="difficultiesLevelsIcons"
                                              >
                                                <svg
                                                  v-if="
                                                    difficulty[
                                                      'display_title'
                                                    ] ===
                                                    'Scuola dell\'Infanzia'
                                                  "
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  width="30px"
                                                  height="29px"
                                                  viewBox="0 0 50 29"
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
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                    difficulty[
                                                      'display_title'
                                                    ] === 'Scuola Primaria'
                                                  "
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  width="30px"
                                                  height="29px"
                                                  viewBox="0 0 50 29"
                                                  version="1.1"
                                                >
                                                  <g id="scuolaPrimaria">
                                                    <path
                                                      style="
                                                        fill-rule: nonzero;
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                    difficulty[
                                                      'display_title'
                                                    ] ===
                                                    'Scuola Secondaria di Primo Grado'
                                                  "
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  width="30px"
                                                  height="29px"
                                                  viewBox="0 0 50 29"
                                                  version="1.1"
                                                >
                                                  <g
                                                    id="scuolaSecondariaDiPrimoGrado"
                                                  >
                                                    <path
                                                      style="
                                                        fill-rule: nonzero;
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                    difficulty[
                                                      'display_title'
                                                    ] ===
                                                    'Scuola Secondaria di Secondo Grado'
                                                  "
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  width="30px"
                                                  height="29px"
                                                  viewBox="0 0 50 29"
                                                  version="1.1"
                                                >
                                                  <g
                                                    id="scuolaSecondariaDiSecondoGrado"
                                                  >
                                                    <path
                                                      style="
                                                        fill-rule: nonzero;
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                    difficulty[
                                                      'display_title'
                                                    ] === 'Università'
                                                  "
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  width="30px"
                                                  height="29px"
                                                  viewBox="0 0 50 29"
                                                  version="1.1"
                                                >
                                                  <g id="Universita">
                                                    <path
                                                      style="
                                                        fill-rule: nonzero;
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                        fill: #ffffff;
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
                                                    difficulty[
                                                      'display_title'
                                                    ] === 'Per Tutti'
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

                                                <!--
                                                <i class="bi bi-reception-4 scuolaDellInfanzia"
                                                   v-if="difficulty['display_title'] === 'Scuola dell\'Infanzia'"></i>
                                                <i class="bi bi-reception-4 scuolaPrimaria"
                                                   v-else-if="difficulty['display_title'] === 'Scuola Primaria'"></i>
                                                <i class="bi bi-reception-4 scuolaSecondariaDiPrimoGrado"
                                                   v-else-if="difficulty['display_title'] === 'Scuola Secondaria di Primo Grado'"></i>
                                                <i class="bi bi-reception-4 scuolaSecondariaDiSecondoGrado"
                                                   v-else-if="difficulty['display_title'] === 'Scuola Secondaria di Secondo Grado'">
                                                </i>
                                                <i class="bi bi-reception-4 universita"
                                                   v-else-if="difficulty['display_title'] === 'Università'"></i>
                                                <i class="bi bi-reception-4 perTutti"
                                                   v-else-if="difficulty['display_title'] === 'Per Tutti'"></i>
                                                   -->
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div v-else>
                                    Nessuna attività disponibile in base ai
                                    filtri selezionati
                                  </div>
                                </div>
                                <div v-else>
                                  Non ci sono attività disponibili
                                </div>
                              </collapse-item>
                            </collapse>
                          </div>
                        </div>
                        <div v-else>
                          Nessun luogo ha delle attività che rientrano nel tempo
                          rimanente a disposizione. Per visualizzarne alcune
                          occorre rimuovere delle attività attualente presenti
                          nell'itinerrio, cliccando il cestino rosso accanto ad
                          esse nel menu "Attività presenti nell'itinerario".
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="px-4">
                        <l-map
                          style="height: 500px"
                          :zoom="zoom"
                          :center="center"
                        >
                          <l-tile-layer
                            :url="url"
                            :attribution="attribution"
                          ></l-tile-layer>
                          <l-marker
                            v-for="(marker, index) in markers"
                            :lat-lng="marker.marker.getLatLng()"
                            :key="'marker' + index"
                          >
                            <l-icon
                              v-if="marker.isStartPoint"
                              :icon-url="require('../icons/startPoint.png')"
                            ></l-icon>
                            <l-icon
                              v-else-if="marker.poiHasActivitiesInItinerary"
                              :icon-url="require('../icons/selectedPOI.png')"
                            ></l-icon>
                            <l-icon
                              v-else-if="!marker.poiHasActivitiesInItinerary"
                              :icon-url="require('../icons/unselectedPOI.png')"
                            ></l-icon>
                            <l-popup :options="anchorOptions">
                              <div class="px-3">
                                <div class="row">
                                  <h5>{{ marker.POItitle }}</h5>
                                </div>
                              </div>
                            </l-popup>
                          </l-marker>

                          <l-circle-marker
                            :lat-lng="circle.center"
                            :radius="circle.radius"
                            :color="circle.color"
                          >
                            <l-popup>Tu sei qui!</l-popup>
                          </l-circle-marker>

                          <l-control>
                            <div class="legend">
                              <h4>Legenda</h4>
                              <i style="background: #82b351"></i
                              ><span>Luogo di partenza/arrivo</span><br />
                              <i style="background: #e35747"></i
                              ><span>Luogo selezionato</span><br />
                              <i style="background: #437fc5"></i
                              ><span>Luogo non selezionato</span><br />
                            </div>
                          </l-control>

                          <l-polyline
                            :lat-lngs="markersPolylines"
                            color="red"
                          ></l-polyline>
                          <l-geo-json :geojson="geojson"></l-geo-json>
                        </l-map>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div
          v-if="!okTimeAvailable"
          class="col-12 errorMessage fade-in-text text-center"
        >
          <h5><b>Devi inserire una fascia oraria corretta!</b></h5>
        </div>
      </div>
    </div>

    <div class="row pt-3">
      <div class="col-12">
        <Button
          v-if="currentStep >= 1"
          size="large"
          type="primary"
          round
          v-on:click="incrementStep(true)"
          class="buttonAlignRight m-2 textButtonColor"
          >Avanti
        </Button>
        <Button
          v-if="currentStep >= 1"
          size="large"
          type="warning"
          round
          v-on:click="goBack()"
          class="buttonAlignLeft m-2 textButtonColor"
          >Indietro
        </Button>
      </div>
    </div>

    <modal
      :show.sync="modals.zeroActivitiesInItinerary"
      headerClasses="justify-content-center"
    >
      <h4 slot="header" class="title title-up text-center">
        Nessuna attività selezionata!
      </h4>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12 text-center">
              <p>
                Non hai inserito nessuna attività nel tuo itinerario, proseguire
                comunque?
              </p>
            </div>
          </div>
        </div>
      </div>

      <template slot="footer">
        <Button
          size="small"
          type="danger"
          v-on:click="modals.zeroActivitiesInItinerary = false"
          class="mx-1 textButtonColor"
          >Chiudi
        </Button>

        <Button
          size="small"
          type="primary"
          v-on:click="incrementStepWithoutActivitiesInItinerary()"
          class="mx-1 textButtonColor"
          >Prosegui
        </Button>
      </template>
    </modal>
  </div>
</template>

<script>
import {
  LCircleMarker,
  LGeoJson,
  LMap,
  LMarker,
  LPopup,
  LIcon,
  LTileLayer,
  LControl,
  LPolyline,
} from "vue2-leaflet";
import { Button } from "element-ui";
import {
  Checkbox,
  Collapse,
  CollapseItem,
  Radio,
  Card,
  Modal,
  FormGroupInput,
} from "../components";

import VueTimepicker from "vue2-timepicker";
import store from "../store";
import * as L from "leaflet";

import "vue-collapsible-component/lib/vue-collapsible.css";
import Collapsible from "vue-collapsible-component";
import Vue from "vue";
import router from "../router";

const Common = require("@/Common.vue").default;
import "bootstrap-icons/font/bootstrap-icons.css";
import "leaflet.awesome-markers";

import $ from "jquery";
import axios from "axios";

export default {
  name: "PercorsiNew",
  components: {
    //Component Leaflet map
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    LPopup,
    LCircleMarker,
    LIcon,
    LControl,
    LPolyline,

    Button,
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
    Collapse,
    CollapseItem,
    Modal,

    //Collapsible
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 16,
      center: [45.47724690648075, 7.888264286334166],
      //markerLatLng: [51.504, -0.159],
      map: null,
      geojson: null,
      markers: [],
      markersPolylines: [],

      coord: null,

      //TEST GEOLOCALIZATION
      location: null,
      gettingLocation: false,
      errorStr: null,
      circle: {
        center: [0, 0],
        radius: 6,
        color: "red",
      },

      currentPage: "createPath", //variabile usata per mostrare il component corretto in base alla scelta fatta dall'utente (riguardo a cosa fare: creare un percorso, selezionarne uno già creato, selezionarne uno di default)
      currentStep: 1, //variabile contenente il numero dello step corrente
      stepTitle: [
        //array di oggetti contenente i titoli delle pagine
        {
          pageNumber: 0,
          pageTitle: "Area percorsi",
        },
        /*
        {
          pageNumber: 1,
          pageTitle: "Seleziona il tempo che hai a disposizione",
        },
        */
        { pageNumber: 1, pageTitle: "Personalizzazione percorso" },
      ],
      startAvailableTimeValue: {
        //oggetto contenente il l'ora di inizio di disponibilità
        HH: "09",
        mm: "30",
      },
      endAvailableTimeValue: {
        //oggetto contenente il l'ora di fine di disponibilità
        HH: "10",
        mm: "30",
      },
      okTimeAvailable: true, //variabile usata per mostrare o meno l'errore a schermo se l'utente inserisce uno slot orario erratp

      filteredPOI: [], //array di POI filtrati con i filtri

      selectAllDifficulties: false, //variabile usata per selezionare/deselezionare tutte le difficoltà
      selectAllInterests: false, //variabile usata per selezionare/deselezionare tutti gli interessi

      startDifficulties: true,
      startInterests: true,

      //somePOIVisible: false, //variabile usata per capire se alcuni POI sono visibili o meno in bae ai filtri

      allDifficulties: [
        "Scuola dell'Infanzia",
        "Scuola Primaria",
        "Scuola Secondaria di Primo Grado",
        "Scuola Secondaria di Secondo Grado",
        "Università",
        "Per Tutti",
      ],

      allInterests: [
        "Storico",
        "Archeologico",
        "Architettonico",
        "Naturalistico",
        "Glaciologico",
        "Petrografico",
        "Geomorfologico",
        "Paleontologico",
        "Geochimico",
        "Idrogeologico",
        "Chimico",
        "Mineralogico",
        "Geologico",
        "Biologico",
        "Didattico",
        "Scientifico",
        "Divulgativo",
      ],

      pathCodeInserted: "", //variabile usata per contenere il codice del percorso inserito dell'utente

      //Test filtri
      Items: [
        {
          name: "Apple",
        },
        {
          name: "Orange",
        },
        {
          name: "Mengo",
        },
        {
          name: "Cherry",
        },
      ],
      user: {
        fruitCollection: [],
      },

      idsOfPOI: [
        {
          poiName: "Laboratorio GeoDidaLab",
          poiID: 1,
        },
        {
          poiName: "Lago San Michele",
          poiID: 2,
        },
        {
          poiName: "Parco della Polveriera",
          poiID: 2,
        },
      ],

      anchorOptions: { offset: L.point(0, -30) },

      //DATI NUOVI
      itinerario: null,

      startPoint: [45.47561994860321, 7.889627627278735],
      endPoint: [45.47548295737901, 7.888970990326549],

      modals: {
        //oggetto usato per mostrare i modals
        zeroActivitiesInItinerary: false,
      },
    };
  },

  mounted() {
    var self = this;

    console.log("TEMPO DISPONIBILE PERSONALIZZAZIONE: ");
    console.log(this.$route);
    console.log(this.$store.state.timeAvailable.milliseconds);

    console.log(this.$store.state.itinerarioInCreazione);

    var activitiesInItinerary = []; //this.$store.state.itinerarioInCreazione.poi.map(poi => poi.poiName);

    Array.prototype.forEach.call(
      this.$store.state.itinerarioInCreazione.poi,
      (poi) => {
        Array.prototype.forEach.call(poi.activitiesInPOI, (activity) => {
          activitiesInItinerary.push(activity.activityName);
        });
      }
    );

    console.log(activitiesInItinerary);

    this.filteredPOI = store.state.POIpivot;

    console.log(this.filteredPOI);
    console.log(store.state.POIpivot);

    /*
    store.commit("setAvailableActivitiesInRemainingTime", {
      activitiesInItinerary,
    });
    */

    //console.log("Remaining time qua: " + this.remainingTime);

    //calcolo tempo rimanente
    var totalTimeMinutes = 0;
    var totalMilliseconds = 0;

    Array.prototype.forEach.call(this.filteredPOI, (poi) => {
      Array.prototype.forEach.call(poi.mis, (activity) => {
        if (activity.insertedInItinerary) {
          console.log("sommo " + activity["geo:Durata"][0]["@value"]);
          totalTimeMinutes += parseInt(activity["geo:Durata"][0]["@value"]);
        }
      });
    });

    totalMilliseconds = totalTimeMinutes * 60000;

    this.$store.commit("initializeAvailableActivitiesInRemainingTime", {
      activityInItinerary: activitiesInItinerary,
    });

    var remainingTime = this.getRemainingTime();

    console.log("Remaining time qua 1: " + remainingTime);

    this.$store.commit("setAvailableActivitiesInRemainingTime", {
      activityInItinerary: activitiesInItinerary,
      remainingTime: remainingTime,
    });

    console.log("Remaining time qua 3: ");
    console.log(this.remainingTimeHourAndMinutes);

    console.log("dempo disponibile milliseconds");
    console.log(this.$store.state.timeAvailable.milliseconds);
    console.log("millisecondsTotaliItinerario");
    //console.log(this.getTotalTimeMillisecondsItinerario());

    console.log("STAMPA DOPO IL COMMIT NELLO STORE");
    console.log(this.$store.state.availableActivitiesInRemainingTime);

    this.filteredPOI = store.state.availableActivitiesInRemainingTime;
    console.log("availableActivitiesInRemainingTime");

    console.log(this.filteredPOI);

    this.createMarkerArrayItinerary();
    this.initializeMarkersOfFilteredPOI();

    //TODO: remove me
    //console.log("this.selectedDifficulties.length : " + this.selectedDifficulties.length);
    //console.log("this.selectedInterests.length : " + this.selectedInterests.length);

    this.selectAllDifficulties =
      this.$store.state.expertiseLevels
        .filter((expLevel) => expLevel.expertiseLevelSelected)
        .map((expLevel) => expLevel.expertiseLevelName).length ==
      this.allDifficulties.length
        ? true
        : false;

    this.selectAllInterests =
      this.$store.state.interests
        .filter((interest) => interest.interestSelected)
        .map((interest) => interest.interestName).length ==
      this.allInterests.length
        ? true
        : false;

    this.startInterests = false;
  },

  async created() {
    //TODO: remove me
    //console.log("ASYNC CREATED");

    // eseguo la query per gli strumenti solo la prima volta che apro la pagina degli Strumenti

    /**
     * 121 : class id POI_Pivot
     */

    var self = this;

    this.itinerario = this.$store.state.itinerarioInCreazione; //this.$route.params.itineraryObject;

    console.log("THIS ITINERARIO");
    console.log(this.itinerario);

    /*
    Common.getElemsByClass(this, 121, (res) => {
      store.state.POIpivot = res.body;
      self.isLoadingPOIPivot = false;

      //TODO: remove me
      //console.log(res.body);

      Array.prototype.forEach.call(store.state.POIpivot, (poi) => {
        if (poi.hasOwnProperty("o-module-mapping:marker")) {
          // Get module-mapping
          Common.getElemByUrl(
            self,
            poi["o-module-mapping:marker"][0]["@id"],
            (r2) => {
              poi.marker = r2.body;
            }
          );
        } else {
          //Il POI non ha nessuna coordinata
        }
      });
    });*/

    /**
     * 118 : class id Misurazione
     * 130 : class id Attivita
     */

    /*
    //chiedo gli esperimenti perchè magari non sono mai andato nella pagina dedicata a loro prima d'ora, ma mi servono qua
    Common.getElemsByClass(this, 130, (res) => {
      store.state.esperimenti = res.body;
      //TODO: remove me
      //console.log(res.body);

      store.commit("setActivitiesInPOI");

      this.filteredPOI = store.state.POIpivot;
      //TODO: remove me
      //console.log(this.filteredPOI);
      this.initializeMarkersOfFilteredPOI();

      self.activitiesLoaded = true;
      self.isLoadingEsperimenti = false;
    });

    //chiedo i livelli di difficoltà
    Common.getElemsByClass(this, 129, (res) => {
      store.state.difficultyLevels = res.body;

      //TODO: remove me
      //console.log(store.state.difficultyLevels);
      store.commit("setAllExpertiseLevels");
    });

    //chiedo gli interessi
    Common.getElemsByClass(this, 128, (res) => {
      store.state.interestsObject = res.body;

      //TODO: remove me
      //console.log(store.state.interestsObject);
      store.commit("setAllinterestOfPOI");
    });
    */
  },

  methods: {
    /*
    getIcon(item) {
      return L.divIcon({
        className: "my-custom-pin",
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 34.892337" height="40" width="40">
                    <g transform="translate(-814.59595,-274.38623)">
                        <g transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)">
                            <path d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z" style="fill:${item.color};stroke:${item.strokeColor};"/>
                        <circle r="3.0355" cy="288.25278" cx="823.03064" id="path3049" style="display:inline;fill:${item.circleColor};"/>
                        </g>
                    </g>
                </svg>`
      });
    },*/

    createPath() {
      console.log("createPath");
      var hAvailable =
        this.endAvailableTimeValue.HH - this.startAvailableTimeValue.HH;
      var minAvailable =
        this.endAvailableTimeValue.mm - this.startAvailableTimeValue.mm;

      //TODO: remove me
      //console.log("hAvailable: " + hAvailable + ", minAvailable: " + minAvailable)

      if (hAvailable > 0) {
        this.okTimeAvailable = true;
        this.currentStep++;
      } else {
        this.okTimeAvailable = false;
      }
    },

    insertPathCode() {
      console.log("insertPathCode");
      this.modals.insertCodeModal = true;
    },

    selectDefaultPath() {
      console.log("selectDefaultPath");

      this.currentPage = "selectDefaultPath";
    },

    incrementStepWithoutActivitiesInItinerary() {
      console.log("incrementStepWithoutActivitiesInItinerary");

      this.modals.zeroActivitiesInItinerary = false;

      //TODO: selezionare tutte le attività a far generare un percorso qualsiasi a vroom
    },

    incrementStep(nextPage) {
      //se c'è almeno un'attività nell'itinerario
      if (this.poiWithActivitiesInItinerary.length > 0) {
        this.contructVROOMObject(nextPage);
      } else {
        //modal che non fa proseguire l'utente
        console.log("INSERISCI ALMENO UN'ATTIVITA'");
        this.modals.zeroActivitiesInItinerary = true;
        console.log(
          "this.modals.insertCodeModal: " +
            this.modals.zeroActivitiesInItinerary
        );
      }

      console.log("next page: " + nextPage);

      //console.log("DOPO MAKE QUERY VROOM");
      //console.log(vroomItineraryResponse);

      //var itineraryCorrectObject = this.createItineraryObject(vroomItineraryResponse);
      /*
      if (this.currentStep === 1) {
        //do nothing
      } else if (this.currentStep === 2) {
      } else if (this.currentStep === 3) {
      } else if (this.currentStep === 4) {
      }
      */
    },

    /*
    initializeMarkersOfFilteredPOI() {
      this.markers = [];

      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        if (poi.poiVisibleWithFilters || poi.poiHasActivitiesSelected) {
          this.markers.push({
            marker: L.marker([
              poi.marker["o-module-mapping:lat"],
              poi.marker["o-module-mapping:lng"],
            ]),
            color: "#1585bd",
            strokeColor: "#1b4f88",
            circleColor: "#ffffff",
            POItitle: poi["geo:Titolo_it"][0]["@value"],
            poiSelected: poi.poiHasActivitiesSelected,
          });
        }
      });

      this.markersCreated = true;
    },
    */

    contructVROOMObject(nextPage) {
      console.log(this.$route);
      console.log(
        "timeAvailable milliseconds: " +
          this.$store.state.timeAvailable.milliseconds
      );

      var vroomObject = {
        jobs: [],
        vehicles: [
          {
            id: 1,
            profile: "car",
            start_index: 0,
            end_index: 0,
            start: [45.47561994860321, 7.889627627278735],
            end: [45.47548295737901, 7.888970990326549],
            time_window: [0, this.$store.state.timeAvailable.milliseconds], //TODO: inserire qua il tempo a disposizione in millisecondi
          },
        ],
        matrices: {
          car: {
            durations: [
              [0, 600, 1200, 500],
              [600, 0, 500, 1200],
              [1200, 500, 0, 600],
              [500, 1200, 600, 0],
            ],
            costs: [
              [0, 600, 1200, 500],
              [600, 0, 500, 1200],
              [1200, 500, 0, 600],
              [500, 1200, 600, 0],
            ],
          },
        },
      };

      console.log("FILTRO I POI");

      //oggetto contenente i POI con delle attività nell'itinerario
      var poiWithSelectedActivities = this.filteredPOI.filter(
        (poi) => poi.hasActivitiesInItinerary
      );

      /*
      //se nessun POI ha delle attività selezionate allora è come averle selezionate tutte
      if (poiWithSelectedActivities.length === 0) {
        Array.prototype.forEach.call(this.filteredPOI, (poi) => {
          Array.prototype.forEach.call(poi.mis, (activity) => {
            activity.selected = true;
          });
        });

        poiWithSelectedActivities = this.filteredPOI;
      }
      */

      //TODO: remove me
      //onsole.log("poi con attività selezionate");
      console.log(poiWithSelectedActivities);

      var jobID = 1;

      //creo i jobs per l'oggetto VROOM
      Array.prototype.forEach.call(poiWithSelectedActivities, (poi) => {
        var activitiesSelected = poi.mis.filter(
          (activity) => activity.insertedInItinerary
        );

        console.log("activitiesSelected");
        console.log(activitiesSelected);

        console.log(poi["geo:Titolo_it"][0]["@value"]);
        var poiIDObject = this.idsOfPOI.filter(
          (p) => p.poiName === poi["geo:Titolo_it"][0]["@value"]
        );

        console.log(poiIDObject[0]);

        Array.prototype.forEach.call(activitiesSelected, (activity) => {
          var job = {
            id: jobID, //1, //l'id deve essere stabilito a priori, ad esempio: lago licheni -> 1
            description:
              poi["geo:Titolo_it"][0]["@value"] + "_" + activity["o:title"],
            service: this.getMilliseconds(activity["geo:Durata"][0]["@value"]),
            location: [
              poi.marker["o-module-mapping:lat"],
              poi.marker["o-module-mapping:lng"],
            ],
            location_index: poiIDObject[0].poiID,
          };

          console.log("JOB creato");

          vroomObject.jobs.push(job);

          jobID += 1;
        });
      });

      console.log("VROOM OBJECT");
      console.log(vroomObject);
      console.log(JSON.stringify(vroomObject));

      var vroomItineraryResponse = this.makeQueryVROOM(vroomObject, nextPage);
    },

    createMarkerArrayItinerary() {
      this.markersPolylines = [];

      //Punto di partenza
      //this.markersPolylines.push(this.startPoint);

      console.log("CREO LE LINEE TRA I MARKER");
      console.log(this.$store.state.itinerarioInCreazione);

      Array.prototype.forEach.call(
        this.$store.state.itinerarioInCreazione.poi,
        (poi) => {
          console.log(poi);
          var POIlat = poi["location"][0];
          var POIlng = poi["location"][1];

          var POIcoordinates = null;

          //TODO: è un fix temporaneo -> va risolto in un altro punto, da capire dove
          if (POIlng < POIlat) {
            POIcoordinates = [POIlat, POIlng];
          } else {
            POIcoordinates = [POIlng, POIlat];
          }

          this.markersPolylines.push(POIcoordinates);
        }
      );

      //Punto di arrivo
      this.markersPolylines.push(this.endPoint);

      console.log(this.markersPolylines);
    },

    createMarkerArray() {
      this.markersPolylines = [];

      //Punto di partenza
      this.markersPolylines.push(this.startPoint);

      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        if (poi.hasActivitiesInItinerary) {
          console.log(poi);
          var POIlat = poi.marker["o-module-mapping:lat"];
          var POIlng = poi.marker["o-module-mapping:lng"];

          var POIcoordinates = [POIlat, POIlng];

          this.markersPolylines.push(POIcoordinates);
        }
      });

      //Punto di arrivo
      this.markersPolylines.push(this.endPoint);

      console.log(this.markersPolylines);
    },

    //collega solo il punto di partenza con il punto di arrivo
    createMarkerArrayStartToEnd() {
      this.markersPolylines = [];

      //Punto di partenza
      this.markersPolylines.push(this.startPoint);

      //Punto di arrivo
      this.markersPolylines.push(this.endPoint);

      console.log(this.markersPolylines);
    },

    initializeMarkersOfFilteredPOI() {
      this.markers = [];

      //marker punto di partenza
      this.markers.push({
        marker: L.marker(this.startPoint),
        color: "#1585bd",
        strokeColor: "#1b4f88",
        circleColor: "#ffffff",
        POItitle: "Punto di partenza",
        poiHasActivitiesInItinerary: false,
        isStartPoint: true,
      });

      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        console.log("POI");
        console.log(poi);

        //if (poi.hasActivitiesInItinerary) {
        this.markers.push({
          marker: L.marker([
            poi.marker["o-module-mapping:lat"],
            poi.marker["o-module-mapping:lng"],
          ]),
          color: "#1585bd",
          strokeColor: "#1b4f88",
          circleColor: "#ffffff",
          POItitle: poi["geo:Titolo_it"][0]["@value"],
          poiHasActivitiesInItinerary: poi.hasActivitiesInItinerary,
          isStartPoint: false,
        });
        //}
      });

      //marker punto di arrivo
      this.markers.push({
        marker: L.marker(this.endPoint),
        color: "#1585bd",
        strokeColor: "#1b4f88",
        circleColor: "#ffffff",
        POItitle: "Punto di arrivo",
        poiHasActivitiesInItinerary: false,
        isStartPoint: true,
      });

      console.log("MARKERS: ");
      console.log(this.markers);

      this.markersCreated = true;
    },

    changeSelection(poiName, activityName) {
      //TODO: remove me
      //console.log("CHANGE SELECTION: " + poiName + ", " + activityName);

      var tmpFilteredPOI = this.filteredPOI;

      Array.prototype.forEach.call(tmpFilteredPOI, (poi) => {
        console.log("NOME: " + poi["geo:Titolo_it"][0]["@value"]);
        console.log("POI NAME: " + poiName);

        if (poi["geo:Titolo_it"][0]["@value"] === poiName) {
          //TODO: remove me
          console.log("POI TROVATO");
          Array.prototype.forEach.call(poi.mis, (activity) => {
            //TODO: remove me
            console.log("ACTIVITY TROVATA");

            if (activity["o:title"] === activityName) {
              activity.insertedInItinerary = !activity.insertedInItinerary;
            }
          });
        }
      });

      //imposto se il POI ha delle attività selezionate e se ha delle attività che stanno nel tempo rimanente
      Array.prototype.forEach.call(tmpFilteredPOI, (poi) => {
        var hasActivitiesInItinerary = false;
        var hasActivitiesAvailableForRemainingTime = false;

        Array.prototype.forEach.call(poi.mis, (activity) => {
          if (activity.insertedInItinerary) {
            hasActivitiesInItinerary = true;
            console.log("IL POI ha delle attività nell'itinerario");
          }

          //calcolo tempo rimanente
          var totalTimeMinutes = 0;
          var totalMilliseconds = 0;

          Array.prototype.forEach.call(this.filteredPOI, (poi) => {
            Array.prototype.forEach.call(poi.mis, (activity) => {
              if (activity.insertedInItinerary) {
                console.log("sommo " + activity["geo:Durata"][0]["@value"]);
                totalTimeMinutes += parseInt(
                  activity["geo:Durata"][0]["@value"]
                );
              }
            });
          });

          totalMilliseconds = totalTimeMinutes * 60000;

          var remainingTime =
            this.$store.state.timeAvailable.milliseconds - totalMilliseconds;

          if (
            parseInt(activity["geo:Durata"][0]["@value"]) * 60000 <
              remainingTime &&
            !activity.insertedInItinerary
          ) {
            console.log(
              "Il POI ha delle attività disponibili nel tepo a disposizione"
            );
            hasActivitiesAvailableForRemainingTime = true;
          }
        });

        poi.hasActivitiesInItinerary = hasActivitiesInItinerary;
        poi.hasActivitiesAvailableForRemainingTime =
          hasActivitiesAvailableForRemainingTime;
      });

      //TODO: funziona -> se si riesce migliorarlo
      for (var i = 0; i < this.filteredPOI.length; i++) {
        this.$set(this.filteredPOI, i, tmpFilteredPOI[i]);
      }

      console.log("stampo dopo la selezione");
      console.log(this.filteredPOI);

      console.log("POI CON DELLE ATTIVITA NELL'ITINERARIO");
      console.log(this.poiWithActivitiesInItinerary);

      if (this.poiWithActivitiesInItinerary.length > 0) {
        this.incrementStep(false);
      } else {
        //nell'itinerario non è stata inserita nessuna attività
        this.initializeMarkersOfFilteredPOI();
        this.createMarkerArrayStartToEnd();
      }
    },

    //funziona chiamata quando si seleziona/deseleziona un interesse
    checkInterest(index, interestName) {
      //TODO: remove me
      //console.log("checkInterest: " + index + ", " + interestName);

      //TODO: filtrare i POI in base all'interesse
      //TODO: remove me
      //console.log(this.selectedInterests);

      //filtro i POI in base agli interessi
      //this.filterPOIofCorrectInterests();
      this.filterActivitiesOfCorrectInterests();
      this.setPOIVisibilityWithInterestsSelected();

      //aggiorno i markers sulla mappa
      this.initializeMarkersOfFilteredPOI();
    },

    //funziona chiamata quando si seleziona/deseleziona una difficoltà
    checkDifficulty(index, difficultyName) {
      //TODO: remove me
      //console.log("checkDifficulty: " + index + ", " + difficultyName);

      //TODO: remove me
      //console.log(this.selectedDifficulties);

      //filtro i POI in base alla difficoltà
      this.filterPOIofCorrectDifficulty();
      this.setPOIVisibilityWithInterestsSelected();

      //aggiorno i markers sulla mappa
      this.initializeMarkersOfFilteredPOI();
    },

    //funziona chiamata quando si seleziona/deseleziona "Select All" in difficulties
    selectAllDifficultiesFunctions() {
      //TODO: remove me
      //console.log("selectAllDifficulties");

      this.selectAllDifficulties = !this.selectAllDifficulties;

      for (var i = 0; i < this.$store.state.expertiseLevels.length; i++) {
        this.$set(
          this.$store.state.expertiseLevels[i],
          "expertiseLevelSelected",
          this.selectAllDifficulties
        );
      }

      //filtro i POI in base alla difficoltà
      this.filterPOIofCorrectDifficulty();
      this.setPOIVisibilityWithInterestsSelected();

      //aggiorno i markers sulla mappa
      this.initializeMarkersOfFilteredPOI();
    },

    //funziona chiamata quando si seleziona/deseleziona "Select All" in interests
    selectAllInterestsFunctions() {
      //TODO: remove me
      //console.log("selectAllInterests");

      this.selectAllInterests = !this.selectAllInterests;

      for (var i = 0; i < this.$store.state.interests.length; i++) {
        this.$set(
          this.$store.state.interests[i],
          "interestSelected",
          this.selectAllInterests
        );
      }

      //filtro i POI in base agli interessi
      //this.filterPOIofCorrectInterests();
      this.filterActivitiesOfCorrectInterests();
      this.setPOIVisibilityWithInterestsSelected();

      //aggiorno i markers sulla mappa
      this.initializeMarkersOfFilteredPOI();
    },

    filterPOIofCorrectDifficulty() {
      //filtro i POI in base alla difficoltà
      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        Array.prototype.forEach.call(poi.mis, (exp) => {
          var expHasCorrectExpertiseLevels = false;

          Array.prototype.forEach.call(
            exp["geo:ha_difficolta"],
            (difficulty) => {
              if (
                this.selectedDifficulties.includes(difficulty["display_title"])
              ) {
                expHasCorrectExpertiseLevels = true;
              }
            }
          );

          //exp.activityVisibleWithFilters = expHasCorrectExpertiseLevels;
          exp.activityVisibleWithDifficultiesFilters =
            expHasCorrectExpertiseLevels;
        });
      });
    },

    filterPOIofCorrectInterests() {
      //filtro i POI in base agli interessi
      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        var poiHasCorrectInterests = false;

        Array.prototype.forEach.call(poi["geo:ha_interesse"], (interest) => {
          if (this.selectedInterests.includes(interest["display_title"])) {
            poiHasCorrectInterests = true;
          }
        });

        poi.poiVisibleWithFilters = poiHasCorrectInterests;
      });
    },

    filterActivitiesOfCorrectInterests() {
      //filtro i POI in base alla difficoltà
      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        Array.prototype.forEach.call(poi.mis, (exp) => {
          var expHasCorrectInterests = false;

          Array.prototype.forEach.call(exp["geo:ha_interesse"], (interest) => {
            if (this.selectedInterests.includes(interest["display_title"])) {
              expHasCorrectInterests = true;
            }
          });

          exp.activityVisibleWithInterestsFilters = expHasCorrectInterests;
        });
      });
    },

    setPOIVisibilityWithInterestsSelected() {
      var poiHasActivitiesVisible = false;
      var tmpFilteredPOI = this.filteredPOI;

      //TODO: remove me
      //console.log("setPOIVisibilityWithInterestsSelected");

      for (var i = 0; i < tmpFilteredPOI.length; i++) {
        Array.prototype.forEach.call(tmpFilteredPOI[i].mis, (activity) => {
          if (
            activity.activityVisibleWithInterestsFilters &&
            activity.activityVisibleWithDifficultiesFilters
          ) {
            poiHasActivitiesVisible = true;
            //TODO: remove me
            //console.log("IL POI HA ALMENO UN'ACTIVITY VISIBILE");
          }
        });

        //TODO: remove me
        //console.log("poiHasActivitiesVisible: " + poiHasActivitiesVisible);

        this.$set(
          tmpFilteredPOI[i],
          "poiVisibleWithFilters",
          poiHasActivitiesVisible
        );
      }

      //TODO: funziona -> se si riesce migliorarlo
      for (var i = 0; i < this.filteredPOI.length; i++) {
        this.$set(this.filteredPOI, i, tmpFilteredPOI[i]);
      }
    },
    goBack() {
      console.log("GO BACK");

      /*
      var timeAvailable = this.$store.state.timeAvailable;

      console.log("TIME AVAILABLE PRIMA DI TORNARE INDIETRO");
      console.log(timeAvailable);
      */

      router.go(-1);

      //router.replace({ path: "/percorsi" });
    },
    getMilliseconds(minutesString) {
      var minutesInt = parseInt(minutesString);
      return minutesInt * 60000;
    },

    makeQueryVROOM(vroomObject, nextPage) {
      var self = this;

      console.log("effettuo la query");
      $.ajax({
        type: "POST",
        data: JSON.stringify(vroomObject),
        url: "https://vroom.geodidalab.unito.it/",
        contentType: "application/json",
      }).done(function (res) {
        console.log("res", res);
        console.log("JSON res", JSON.stringify(res));

        self.createItineraryObject(res, nextPage);

        //return res;
        // Do something with the result :)
      });
    },

    createItineraryObject(vroomResponseObject, nextPage) {
      //TODO: implement

      console.log("OGGETTO IN INPUT NEL METODO createItineraryObject");
      console.log(vroomResponseObject);

      var itineraryObject = {
        name: "Itinerario",
        poi: null,
      };

      var poiArray = [];
      var activityInPOIArray = [];

      Array.prototype.forEach.call(
        vroomResponseObject.routes[0].steps,
        (step, index) => {
          var activity = step;

          console.log("ACTIVITY - STEP");
          console.log(step);

          if (activity.type === "start") {
            activity.description = "Punto di partenza";
            activity.poiName = "Punto di partenza";
            activity.activityName = "Punto di partenza";

            poiArray.push({
              poiName: "Punto di partenza",
              location: activity.location,
            });
          } else if (activity.type === "end") {
            activity.description = "Punto di arrivo";
            activity.poiName = "Punto di arrivo";
            activity.activityName = "Punto di arrivo";

            poiArray.push({
              poiName: "Punto di arrivo",
              location: activity.location,
            });
          } else {
            var fields = activity.description.split("_");

            activity.poiName = fields[0];
            activity.activityName = fields[1];

            console.log("ACTIVITY NON INIZIO O FINE");
            console.log(activity);

            //se non esiste già un oggetto poi con lo stesso nome (ovvero rappresentante lo stesso poi), allora lo aggiungo
            var poiWithSameName = poiArray.filter(
              (poi) => poi.poiName === fields[0]
            );
            if (poiWithSameName.length === 0) {
              poiArray.push({
                poiName: fields[0],
                location: activity.location,
              });
            }
          }

          activity.index = index;

          //60000 : 1 = tmpPOI.service : x
          activity.serviceDurationMinutes = activity.service / 60000;

          activityInPOIArray.push(activity);
        }
      );

      console.log("POI ARRAY");
      console.log(poiArray);

      Array.prototype.forEach.call(poiArray, (poi, index) => {
        var activitiesInPOI = activityInPOIArray.filter(
          (activity) => activity.poiName === poi.poiName
        );
        poi.activitiesInPOI = activitiesInPOI;
      });

      /*
      let group = poiArray.reduce((r, a) => {
        //console.log("a", a);
        //console.log('r', r);
        r[a.poiName] = [...r[a.poiName] || [], a];
        return r;
      }, {});
      console.log("group", group);
      */

      itineraryObject.poi = poiArray;

      console.log("itineraryObject");
      console.log(itineraryObject);

      this.$store.state.itinerarioInCreazione = itineraryObject;

      console.log("ITINERARIO IN CREAZIONE - PERSONALIZZAZIONE: ");
      console.log(this.$store.state.itinerarioInCreazione);

      this.createMarkerArrayItinerary();
      this.initializeMarkersOfFilteredPOI();

      /*
      axios
          .get('/api/itinerari/8V5p42TU8ri8ULHARZ8d')
          .then(response => {
            this.info = response.data;

            console.log("Percorso ottenuto");
            console.log(this.info);
          }).catch(error => {

      }).finally({});

       */

      //TODo: query servlet
      /*
      $.ajax({
        url: "/api/itinerari/8V5p42TU8ri8ULHARZ8d",
        type: "GET",
        success: function (result) {
          //self.geojson = result;
          console.log("RISPOSTA: ");
          console.log(result);
        },
        error: function (error) {
          console.log("error: ");
          console.log(error);
        },
      });
      */

      //TODO: mnavigare all'altra pagina

      if (nextPage) {
        router.push({
          name: "itinerariogenerato",
        });
      }
    },

    getTotalTimeMillisecondsItinerario() {
      console.log(
        "getTotalTimeMillisecondsItinerario - calcolo il tempo dell'itinerario"
      );
      var totalTimeMinutes = 0;

      console.log(this.filteredPOI);

      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        console.log("POI in getTotalTimeMillisecondsItinerario");
        console.log(poi);
        Array.prototype.forEach.call(poi.mis, (activity) => {
          if (activity.insertedInItinerary) {
            console.log("sommo " + activity["geo:Durata"][0]["@value"]);
            totalTimeMinutes += parseInt(activity["geo:Durata"][0]["@value"]);
          }
        });
      });

      console.log("minuti totali " + totalTimeMinutes);
      console.log("getTotalTimeMillisecondsItinerario - prima del return");
      return totalTimeMinutes * 60000;
    },

    getRemainingTime() {
      console.log("getRemainingTime");
      var result =
        this.$store.state.timeAvailable.milliseconds -
        this.getTotalTimeMillisecondsItinerario();

      console.log("getRemainigTime - prima del return");

      return result;
    },
  },

  computed: {
    selectedInterests() {
      var mappedInterests = this.$store.state.interests
        .filter((interest) => interest.interestSelected)
        .map((interest) => interest.interestName);

      if (mappedInterests.length === 0) {
        return this.allInterests;
      } else {
        return mappedInterests;
      }
    },
    selectedDifficulties() {
      var mappedDifficulties = this.$store.state.expertiseLevels
        .filter((expLevel) => expLevel.expertiseLevelSelected)
        .map((expLevel) => expLevel.expertiseLevelName);

      if (mappedDifficulties.length === 0) {
        return this.allDifficulties;
      } else {
        return mappedDifficulties;
      }
    },

    somePOIVisible() {
      //TODO: remove me
      //console.log("somePOIVisile");
      return (
        this.filteredPOI.filter(
          (poi) => poi.hasActivitiesAvailableForRemainingTime
        ).length > 0
      );
    },

    someActivitiesSelected() {
      //TODO: remove me
      //console.log("someActivitiesSelected");
      return this.itinerario.poi.length > 0;
    },

    //TODO: remove me
    someActivitiesVisible() {
      var someActivitiesVisible = false;

      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        Array.prototype.forEach.call(poi.mis, (activity) => {
          if (
            activity.activityVisibleWithInterestsFilters &&
            activity.activityVisibleWithDifficultiesFilters
          ) {
            someActivitiesVisible = true;
          }
        });
      });

      return someActivitiesVisible;
    },

    remainingTime() {
      return (
        this.$store.state.timeAvailable.milliseconds -
        this.totalTimeMillisecondsItinerario
      );
    },

    remainingTimeHourAndMinutes() {
      //1 : 60000 = x : remainingTime
      var minutes = this.remainingTime / 60000;

      var hours = Math.floor(minutes / 60);
      var remainingMinutes = minutes - hours * 60;

      return {
        hours: hours,
        minutes: remainingMinutes,
      };
    },

    totalTimeMillisecondsItinerario() {
      console.log("calcolo il tempo dell'itinerario");
      var totalTimeMinutes = 0;

      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        Array.prototype.forEach.call(poi.mis, (activity) => {
          if (activity.insertedInItinerary) {
            console.log("sommo " + activity["geo:Durata"][0]["@value"]);
            totalTimeMinutes += parseInt(activity["geo:Durata"][0]["@value"]);
          }
        });
      });

      console.log("minuti totali " + totalTimeMinutes);

      return totalTimeMinutes * 60000;
    },

    poiWithActivitiesInItinerary() {
      return this.filteredPOI.filter((poi) => poi.hasActivitiesInItinerary);
    },
  },

  watch: {
    filteredPOI(newValue, oldValue) {
      //TODO: remove me
      //console.log("FILTERED POI WATCHER");
      //console.log(newValue);
    },
  },
};
</script>

<style scoped>
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

.scuolaDellInfanzia {
  color: black;
}

.scuolaPrimaria {
  color: #e7d431;
}

.scuolaSecondariaDiPrimoGrado {
  color: orange;
}

.scuolaSecondariaDiSecondoGrado {
  color: darkorange;
}

.universita {
  color: orangered;
}

.perTutti {
  color: #71bd54;
}

.card a {
  color: #000000;
}

.card a:hover,
.card a:focus {
  color: #000000;
}

.textButtonColor {
  color: #2c2c2c;
}

/*Legend specific*/
.legend {
  padding: 6px 8px;
  font: 14px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255, 255, 255, 0.8);
  /*box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);*/
  /*border-radius: 5px;*/
  line-height: 24px;
  color: #555;
}

.legend h4 {
  text-align: center;
  font-size: 1rem;
  margin: 2px 12px 8px;
  color: rgb(53, 53, 53);
}

.legend span {
  position: relative;
  bottom: 3px;
}

.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin: 0 8px 0 0;
  opacity: 0.7;
}

.legend i.icon {
  background-size: 18px;
  background-color: rgba(255, 255, 255, 1);
}
</style>