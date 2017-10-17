var BMMP = (function () {


    var templateSentence = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla quis lorem ut libero malesuada feugiat.";
    var templateWords = templateSentence.toLowerCase().replace(/[\.,]/g, '').split(' ');

    var templateWomen = ['Audrey', 'Barbara', 'Camille', 'Delphine', 'Elise', 'Farida', 'Gaelle', 'Hana', 'Iris'];
    var templateMen = ['Alfred', 'Boris', 'Constantin', 'Dimitri', 'Eric', 'Farouk', 'Guy', 'Henry', 'Ismael'];
    var templateLast = ['Smith', 'Doe', 'Decker', 'Becker', 'Cain', 'Martins', 'Mansouri', 'Saidi'];
    var templateLastParticle = ['von', 'van', 'Mc', 'de', 'De'];

// La librairie est représentée sous forme d'objet
    var lib = {

        // La librairie contient son numéro de version de type semver ( semver.org pour plus d'informations
        version: "0.1.0",

        /**********************************************************************
         * Partie Utilitaire de la Librairie
         *********************************************************************/
        utils: {

            /**********************************************************************
             * Utilitaire de randomisation
             *********************************************************************/

            random: {

                /**
                 * Génère un nombre à virgule flottante aléatoire compris entre
                 * @param min {number} un minimum ( non inclus )
                 * @param max {number} un maximun ( non inclus )
                 * @returns {number}
                 */
                float: function (min, max) {

                    // S'assurer de valeurs par défaut
                    min = typeof min !== 'undefined' ? min : 0;
                    max = typeof max !== 'undefined' ? max : 1;

                    return min + Math.random() * (max - min);
                },

                /**
                 * Génère un nombre à entier aléatoire compris entre
                 * @param min {number} un minimum ( non inclus )
                 * @param max {number} un maximun ( non inclus )
                 * @returns {number}
                 */
                integer: function (min, max) {
                    return Math.floor(BMMP.utils.random.float(min, max));
                },

                /**
                 * Récupère un index aléatoire sur un tableau donné
                 * @param array {Array} le tableau donné
                 * @returns {number}
                 */
                arrayIndex: function (array) {
                    return BMMP.utils.random.integer(0, array.length);
                },

                /**
                 * Récupère une valeur aléatoire dans un tableau donné
                 * @param array {Array} le tableau donné
                 * @returns {*}
                 */
                arrayValue: function (array) {
                    return array[BMMP.utils.random.arrayIndex(array)];
                }
            },

            /**********************************************************************
             * Utilitaire de chaines de caractères
             *********************************************************************/

            string: {

                /**
                 * Fait commencer une chaine de caractères par une majuscule
                 * @param string
                 * @returns {string}
                 */
                capitalize: function (string) {
                    return string.charAt(0).toUpperCase() + string.substr(1);
                },

                /**
                 * Rembourre le début d'une chaine de caractère avec un temps pour s'assurer que la chaine ait toujours au minimum x caractères
                 * @param string {string} la chaine de caractère à rembourrer
                 * @param length {number} la longueur minimale souhaitée
                 * @param pattern {string} le motif de rembourrage
                 * @returns {string}
                 */
                pad: function (string, length, pattern) {
                    // S'assurer d'avoir des paramètres par défaut
                    pattern = typeof pattern !== 'undefined' ? pattern : " ";

                    var padded = string;
                    while (padded.length < length) {
                        padded = pattern + padded;
                    }
                    return padded;
                }
            }
        },

        /**********************************************************************
         * Partie Fixture de la Librairie
         *********************************************************************/
        fixture: {

            /**********************************************************************
             * Partie Fixture de chaines de caractères
             *********************************************************************/

            string: {

                /**
                 * Mettre à jour les mots templates
                 * @param template {string}
                 */
                templateUpdate: function (template) {
                    templateSentence = template;
                    templateWords = templateSentence.toLowerCase().replace(/[\.,]/g, '').split(' ');
                },

                /**
                 * Récupère un mot aléatoire dans le liste de mots templates
                 * @returns {string}
                 */
                word: function () {
                    return BMMP.utils.random.arrayValue(templateWords);
                },

                /**
                 * Génère une phrase aléatoire composée de mots aléatoires
                 * @param minWords {number} nombre minimal de mots
                 * @param maxWords {number} nombre maximal de mots
                 * @param endCharacter {string} motif de fin de phrase
                 * @returns {string}
                 */
                sentence: function (minWords, maxWords, endCharacter) {

                    // S'assurer d'avoir des valeurs par défaut
                    minWords = typeof minWords !== 'undefined' ? minWords : 3;
                    maxWords = typeof maxWords !== 'undefined' ? maxWords : 5;
                    endCharacter = typeof endCharacter !== 'undefined' ? endCharacter : "";

                    var wordsCount = BMMP.utils.random.integer(minWords, maxWords);
                    var generatedSentence = "";
                    for (var i = 0; i < wordsCount; i++) {
                        generatedSentence += BMMP.fixture.string.word();
                        if (i < wordsCount - 1) {
                            generatedSentence += " ";
                        }
                    }
                    generatedSentence += endCharacter;

                    return BMMP.utils.string.capitalize(generatedSentence);
                },

                /**
                 * Gènère un paragraph aléatoire composé de phrases aléatoires
                 * @param minSentences {number} Nombre minimal de phrases
                 * @param maxSentences {number} Nombre maximal de phrases
                 * @param minWords {number} Nombre minimal de mots par phrase
                 * @param maxWords {number} Nombre maximal de mots par phrase
                 * @param endSentenceCharacter {string} motif de fin de phrase
                 * @returns {string}
                 */
                paragraph: function (minSentences, maxSentences, minWords, maxWords, endSentenceCharacter) {

                    // S'assurer que des valeurs par default existent
                    minSentences = typeof minSentences !== 'undefined' ? minSentences : 2;
                    maxSentences = typeof maxSentences !== 'undefined' ? maxSentences : 3;

                    var sentencesCount = BMMP.utils.random.integer(minSentences, maxSentences);
                    var generatedParagraph = "";
                    for (var i = 0; i < sentencesCount; i++) {
                        generatedParagraph += BMMP.fixture.string.sentence(minWords, maxWords, endSentenceCharacter);
                        if (i < sentencesCount - 1) {
                            generatedParagraph += " ";
                        }
                    }
                    return generatedParagraph;
                }
            },

            /**********************************************************************
             * Partie Fixture de noms
             *********************************************************************/

            name: {

                /**
                 * Génère un prénom aléatoire
                 * @param gender {string} le genre/sexe du prénom
                 * @returns {string}
                 */
                firstName: function (gender) {

                    // S'assurer d'avoir une valeur par défault
                    gender = typeof gender !== 'undefined' ? gender : "";

                    switch (gender.toLowerCase()) {
                        case "women":
                        case "girl":
                        case "female":
                            return BMMP.utils.random.arrayValue(templateWomen);
                            break;

                        case "men":
                        case "man":
                        case "boy":
                            return BMMP.utils.random.arrayValue(templateMen);
                            break;

                        default:
                            if (Math.random() > 0.5) {
                                return BMMP.utils.random.arrayValue(templateMen);
                            } else {
                                return BMMP.utils.random.arrayValue(templateWomen);
                            }
                    }
                },

                /**
                 * Génère un nom de famille aléatoire
                 * @param particle {boolean} faut il une particule ?
                 * @returns {string}
                 */
                lastName: function (particle) {

                    // S'assurer d'avoir une valeur par défaut
                    particle = typeof particle !== 'undefined' ? particle : Math.random() > 0.5;

                    var generatedName = "";
                    if (particle) {
                        generatedName = BMMP.utils.random.arrayValue(templateLastParticle);
                    }
                    generatedName += BMMP.utils.random.arrayValue(templateLast);
                    return generatedName;
                },

                /**
                 * Génère un nom complet
                 * @param gender le genre/sexe du prénom
                 * @param particle {boolean} faut il une particule au nom de famille ?
                 * @returns {string}
                 */
                fullname: function (gender, particle) {
                    return BMMP.fixture.name.firstName(gender) + " " + BMMP.fixture.name.lastName(particle);
                }
            }
        }
    };

    return lib;

})();

module.exports = BMMP;