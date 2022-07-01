import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import VuexPersistence from 'vuex-persist'

// const vuexLocal = new VuexPersistence({
//     storage: window.localStorage
//   })

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState({
        key: 'somekey',
        storage: window.localStorage,
    })],
    //plugins: [createPersistedState()],
    //plugins: [vuexLocal.plugin],
    state: {
        count: 1,
        urlCache: {}, // Url => Obj

        strumenti: [],
        esperimenti: [],
        POIpivot: [],
        interests: [], //interessi inseriti in una struttura consona per le checkbox

        interestsObject: [], //interessi ricevuti da omeka

        timelines: [],
        events: [],
        expertiseLevels: [],
        schoolLevels: [],
        difficultyLevels: [],
        itinerari: [],
        POI: [],
        aree: [],

        setActivitiesInPOIdone: false,
        setPOIinItinerario: false,


        loadedActivitiesInPOIPivot: false,
        timeAvailable: null,
        itinerarioInCreazione: null,
        totalTimeSelected: 0,

        itinerarioPredefinito: null,

        areasWithSomethingSelected: [],

        availableActivitiesInRemainingTime: [],

        sottoitinerari: [],

        activitiesSelectedList: [],

        isMobile: false,

        media: {
            mediaEsperimenti: [],
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },

        setAllinterestOfPOI(state) {
            if (state.interests.length === 0) {
                // in questo modo non ho interessi duplicati, ma solo una voce unica per ognuno

                Array.prototype.forEach.call(state.interestsObject, i => {
                    state.interests.push({
                        interestName: i['o:title'],
                        interestSelected: false
                    })
                })
            }

            console.log("fine setAllinterestOfPOI");
        },

        setAllExpertiseLevels(state) {
            if (state.expertiseLevels.length === 0) {
                // in questo modo non ho interessi duplicati, ma solo una voce unica per ognuno
                //var expertiseLevels = [...new Set(state.esperimenti.map(x => x["geo:ha_difficolta"]["display_title"]))];

                Array.prototype.forEach.call(state.difficultyLevels, i => {
                    state.expertiseLevels.push({
                        expertiseLevelName: i['o:title'],
                        expertiseLevelSelected: false
                    })
                })
            }

            console.log("fine setAllExpertiseLevels");
        },

        setAllExpertiseLevelsOLD(state) {
            if (state.expertiseLevels.length === 0) {
                // in questo modo non ho interessi duplicati, ma solo una voce unica per ognuno
                var expertiseLevels = [...new Set(state.esperimenti.map(x => x["geo:ha_difficolta"]["display_title"]))];

                Array.prototype.forEach.call(expertiseLevels, i => {
                    state.expertiseLevels.push({
                        expertiseLevelName: i,
                        expertiseLevelSelected: false
                    })
                })
            }
        },

        setAllSchoolLevels(state) {
            if (state.schoolLevels.length === 0) {
                // in questo modo non ho interessi duplicati, ma solo una voce unica per ognuno
                var schoolLevels = [...new Set(state.esperimenti.map(x => x["geo:Livello_scolastico"][0]["@value"]))];

                Array.prototype.forEach.call(schoolLevels, i => {
                    state.schoolLevels.push({
                        schoolLevelName: i,
                        schoolLevelSelected: false
                    })
                })
            }
        },

        initializeAvailableActivitiesInRemainingTime(state, {activityInItinerary}) {
            state.availableActivitiesInRemainingTime = state.POIpivot;

            console.log("initializeAvailableActivitiesInRemainingTime");

            //ciclo tutti i POI
            Array.prototype.forEach.call(state.availableActivitiesInRemainingTime, poiPivot => {
                
                var hasActivitiesInItinerary = false;
                var hasActivitiesAvailableForRemainingTime = false;

                Array.prototype.forEach.call(poiPivot.mis, attivita => {

                    console.log(attivita);

                    //l'attività è nell'itinerario se il suo nome è contenuto in activityInItinerary
                    attivita.insertedInItinerary = activityInItinerary.includes(attivita["o:title"]);

                    if(attivita.insertedInItinerary) {
                        //se un'attività del poi è n itinerario allora il poi ha delle attività inserite nell'itinerario
                        hasActivitiesInItinerary = true;
                    }
                })

                poiPivot.hasActivitiesInItinerary = hasActivitiesInItinerary;
                poiPivot.hasActivitiesAvailableForRemainingTime = hasActivitiesAvailableForRemainingTime;

            })

            console.log(state.availableActivitiesInRemainingTime);

            console.log("FINE initializeAvailableActivitiesInRemainingTime");  
        },

        setAvailableActivitiesInRemainingTime(state, {activityInItinerary, remainingTime}) {
            state.availableActivitiesInRemainingTime = state.POIpivot;

            console.log("ACTIVITY IN ITINERARY STORE");
            console.log(activityInItinerary);
            console.log(remainingTime);

            console.log(state.availableActivitiesInRemainingTime);
            
            //ciclo tutti i POI
            Array.prototype.forEach.call(state.availableActivitiesInRemainingTime, poiPivot => {
                
                var hasActivitiesInItinerary = false;
                var hasActivitiesAvailableForRemainingTime = false;

                Array.prototype.forEach.call(poiPivot.mis, attivita => {

                    console.log(attivita);

                    //l'attività è nell'itinerario se il suo nome è contenuto in activityInItinerary
                    attivita.insertedInItinerary = activityInItinerary.includes(attivita["o:title"]);

                    if(attivita.insertedInItinerary) {
                        //se un'attività del poi è n itinerario allora il poi ha delle attività inserite nell'itinerario
                        hasActivitiesInItinerary = true;
                    }

                    //se il poi ha un'attività non inserita nell'itinerario la cui durata è minore del tempo a disposizione
                    if((parseInt(attivita["geo:Durata"][0]["@value"]) * 60000 < remainingTime) && !attivita.insertedInItinerary) {
                        //allora il poi ha delle attività disponibili da scegliere nel tempo a disposizione
                        hasActivitiesAvailableForRemainingTime = true;
                        console.log("ATTIVITA TROVATA con durata: " + attivita["geo:Durata"][0]["@value"]);
                        console.log("ATTIVITA TROVATA con durata millisec: " + parseInt(attivita["geo:Durata"][0]["@value"]) * 60000);

                        console.log(attivita["o:title"]);
                    }
                })

                poiPivot.hasActivitiesInItinerary = hasActivitiesInItinerary;
                poiPivot.hasActivitiesAvailableForRemainingTime = hasActivitiesAvailableForRemainingTime;

            })

            console.log(state.availableActivitiesInRemainingTime);

            console.log("FINE setAvailableActivitiesInRemainingTime");  
        },

        setAreaInPOIPivot(state) {
            console.log("STORE setAreaInPoiPivot");

            Array.prototype.forEach.call(state.POIpivot, i => {
                console.log(i["geo:appartiene_a_area"]);
            })

            console.log("FINE setAreaInPOIPivot");
            console.log(state.POIpivot);
        },

        setActivitiesInPOIPivot(state) {
            /*
            * cosa vorrei:
            * POI 1:
            *   - attività 1
            *   - attività 2
            *   - attività 3
            * POI 2:
            *   - attività 1
            *  POI 3:
            *   - attività 1
            *   - attività 2
            * */

            Array.prototype.forEach.call(state.POIpivot, i => {
                console.log(i["o:id"]);
                console.log(state.esperimenti);

                var misurazioni = state.esperimenti.filter(x => x["geo:situato_in"][0]["value_resource_id"] === i["o:id"]);

                //Per ogni attività metto che non è selezionata di default
                Array.prototype.forEach.call(misurazioni, attivita => {
                    attivita.selected = false;

                    //attributo usato per mostrare o meno l'attività sulla vista
                    attivita.activityVisibleWithInterestsFilters = true;
                    attivita.activityVisibleWithDifficultiesFilters = true;

                    attivita.durataMillisecondi = attivita["geo:Durata"][0]["@value"] * 60000; //converto i minuti in millisecondi
                })

                console.log(misurazioni);

                if(i.mis === undefined) {
                    i.mis = misurazioni;
                }

                //attributo usato per mostrare o meno il poi sulla vista
                i.poiVisibleWithFilters = true;

                //attributo usato per sapere se ci sono attività selezionate in questo POI
                i.poiHasActivitiesSelected = false;

                //attributo usato per sapere se ci sono delle attività visibili
                i.poiHasSomeActivitiesVisible = true;
            })

            console.log("FINE setActivitiesInPOIPivot");
            console.log(state.POIpivot);
        },

        setActivitiesInPOI(state) {

            console.log("controllo se le ativity sono undefined");

            var undefinedPresent = false;
            Array.prototype.forEach.call(state.POIpivot, pivot => {
                if (pivot.mis === undefined) {
                    undefinedPresent = true;
                }
            })

            if (undefinedPresent) {
                console.log("undefinedPresent - chiamo setActiviesInPOIPivot");

                this.commit("setActivitiesInPOIPivot")
            }

            /*
            * cosa vorrei:
            * POI 1:
            *   - attività 1
            *   - attività 2
            *   - attività 3
            * POI 2:
            *   - attività 1
            *  POI 3:
            *   - attività 1
            *   - attività 2
            * */

            Array.prototype.forEach.call(state.POIpivot, pivot => {

                //console.log("pivot");
                //console.log(pivot);

                var misurazioniInPivot = pivot.mis;

                //console.log("misurazioniInPivot");
                //console.log(misurazioniInPivot);

                var poiInPivot = state.POI.filter(poi => poi["geo:appartiene_a_pivot"][0]["display_title"] === pivot["o:title"]);

                Array.prototype.forEach.call(poiInPivot, poi => {
                    //console.log("POI IN PiVOT");
                    //console.log(pivot);

                    //recupero i poi che appartengono all'itinerario corrente
                    if(poi.activitiesOfPOIPivot === undefined){
                    poi.activitiesOfPOIPivot = misurazioniInPivot;
                    }
                    if(poi.marker === undefined) {
                        console.log("MARKER E' UNDEFINED");
                    poi.marker = pivot.marker;
                    }

                    poi.media = pivot.media;

                    poi.areaDiAppartenenza = pivot["geo:appartiene_a_area"];

                    poi['geo:Durata'] = pivot['geo:Durata'];

                    poi['dcterms:description'] = pivot['dcterms:description'];
                })
            })

            console.log("FINE setActivitiesInPOI");
            console.log(state.POI);

            this.setActivitiesInPOIdone = true;
        },

        setTimelines(state) {
            Array.prototype.forEach.call(state.timelines, i => {
                i.events = state.events.filter(x => x["geo:appartiene_a_timeline"][0]["value_resource_id"] === i["o:id"]);
            })
        },

        /*
        setPOIinPivot(state){

            Array.prototype.forEach.call(state.POIpivot, pivot => {
                //recupero i poi che appartengono all'itinerario corrente
                var poiInPivot = state.POI.filter(x => x["geo:appartiene_a_pivot"][0]["display_title"] === pivot["o:title"]);
                
                //aggiungo i poi all'itinerario
                pivot.poi = poiInPivot;
            })
        },
*/
        setPOIinItinerario(state) {
            /*
            * cosa vorrei:
            * Itinerario 1:
            *   - POI 1
            *   - POI 2
            * Itinerario 2:
            *   - POI 1
            * */

            //TODO:
            //dal poi prendo il pivot, dal pivot prendo tutte le attività e le assegno al poi
            //dopodichè assegno i poi all'itinerario a cui appartengono

            Array.prototype.forEach.call(state.itinerari, itinerario => {
                //recupero i poi che appartengono all'itinerario corrente

                console.log("CIAO ECCOMI!");
                console.log(state.POI);

                var filteredPOI = state.POI.filter(x => x["geo:appartiene_a_itinerario"] !== undefined && x["geo:Posizione_itinerario"] !== undefined);
                var POIWithNotItinerary = state.POI.filter(x => x["geo:appartiene_a_itinerario"] === undefined || x["geo:Posizione_itinerario"] === undefined);

                console.log("filteredPOI");
                console.log(filteredPOI);

                console.log("POIWithNotItinerary");
                console.log(POIWithNotItinerary);

                var poiInItinerario = filteredPOI.filter(x => x["geo:appartiene_a_itinerario"][0]["display_title"] === itinerario["o:title"]);

                //ordino i POI in base alla loro posizione nell'itinerario
                poiInItinerario.sort((a, b) => (a["geo:Posizione_itinerario"][0]["@value"] > b["geo:Posizione_itinerario"][0]["@value"]) ? 1 : ((b["geo:Posizione_itinerario"][0]["@value"] > a["geo:Posizione_itinerario"][0]["@value"]) ? -1 : 0))

                //aggiungo i poi all'itinerario
                itinerario.poi = poiInItinerario;

                var poiGroupedByArea = poiInItinerario.reduce(function (r, a) {
                    console.log("SONO QUA");
                    console.log(a);
                    r[a['areaDiAppartenenza'][0]['display_title']] = r[a['areaDiAppartenenza'][0]['display_title']] || [];
                    r[a['areaDiAppartenenza'][0]['display_title']].push(a);
                    return r;
                }, Object.create(null));
            
                console.log(poiGroupedByArea);

                itinerario.poiGroupedByArea = poiGroupedByArea;
            });



            console.log("FINE setPOIinItinerario");
            console.log(state.itinerari);

            this.setPOIinItinerarioDone = true;
        },

        /* CACHE URL */
        addCachedUrl: (state, [url, payload]) => state.urlCache[url] = payload,
    },
    getters: {
        /*
        allInterestsOfPOI: state => {
            // in questo modo non ho interessi duplicati, ma solo una voce unica per ognuno
            var interests = [...new Set(state.POIpivot.map(x => x["geo:Interesse"][0]["@value"]))];

            Array.prototype.forEach.call(interests, i => {
                state.interests.push({
                    interestName: i,
                    interestSelected: false
                })
            })

            return state.interests;
        },
         */
        /*activitiesInPOI: state => {
            Array.prototype.forEach.call(state.POIpivot, i => {
                console.log(i["o:id"]);
                console.log(state.esperimenti);

                var misurazioni = state.esperimenti.filter(x => x["geo:situato_in"][0]["value_resource_id"] === i["o:id"]);

                i.mis = misurazioni;
            })

            console.log(state.POIpivot);

            return state.POIpivot;
        },*/
        timelinesWithEvents: state => {
            Array.prototype.forEach.call(state.timelines, i => {

                var eventsTimeline = state.events.filter(x => x["geo:appartiene_a_timeline"][0]["value_resource_id"] === i["o:id"]);

                i.events = eventsTimeline;
            })

            //console.log(state.timelines);

            return state.timelines;
        },

        getCached: state => state.urlCache,

        timelines: state => state.timelines,
    }
})

export default store;