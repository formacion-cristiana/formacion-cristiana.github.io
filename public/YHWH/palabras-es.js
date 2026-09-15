// Datos del juego en Español (Archivo de Referencia)
export const WORD_DATA = [
  {
    tags: ["Catecismo","Sacramentos","Tradición"],
    category: "Sacramentos",
    dificultad: 1,
    fortext: "Signos eficaces de la gracia",
    words: [
      {
        category: "Iniciación",
        fortext: "Cimientos de la vida cristiana",
        words: ["BAUTISMO", "EUCARISTÍA", "CONFIRMACIÓN"],
        help: ["puerta de la fe", "cuerpo de Cristo", "sello del Espíritu"]
      },
      {
        category: "Curación y consagración",
        fortext: "Sanación del alma y vocación de servicio",
        words: ["ORDEN sacerdotal", "UNCIÓN", "MATRIMONIO", "RECONCILIACIÓN"],
        help: ["consagración sacerdotal", "...de los enfermos: alivio & fortaleza", "consagración conyugal", "perdón de los pecados"]
      }
    ]
  },
  {
    tags: ["Biblia", "A.T.","Fisica"],
    category: "Génesis en 7 días",
    dificultad: 2,
    fortext: "El relato de la Creación",
    words: [
      {
        category: "ESPACIO & TIEMPO",
        fortext: "Ordenamiento del cosmos",
        words: ["DÍA & NOCHE", "CIELO & SUELO", "TIERRA & MAR", "DESCANSO & SANTIFICACIÓN"],
        help: ["ciclo del tiempo", "firmamento arriba & abajo", "superficie & aguas", "séptimo día"]
      },
      {
        category: "CONTENIDO",
        fortext: "Creación y criaturas al servicio del Hombre",
        words: ["HIERBAS & ÁRBOLES", "SOL & LUNA", "AVES & MONSTRUOS", "REPTILES & HUMANOS"],
        help: ["...que produzcan semillas y frutos", "lumbreras", "...del cielo & ...del mar", "tierra firme"]
      }
    ]
  },
  {
    tags: ["Biblia", "A.T.","Moral"],
    category: "El Decálogo",
    dificultad: 1,
    fortext: "Leyes de la 1era Alianza",
    words: [
      {
        category: "PRECEPTOS",
        fortext: "Deberes para/con nuestros creadores",
        words: ["AMAR", "SANTIFICAR", "RESPETAR"],
        help: ["...a Dios", "...las fiestas", "...a padre y madre"]
      },
      {
        category: "PROHIBICIONES",
        fortext: "Límites que protejen lo privado",
        words: ["prohibido MATAR", "prohibido ROBAR", "prohibido ADULTERAR", "prohibido MENTIR"],
        help: ["atentar contra la vida", "tomar lo ajeno", "romper la alianza matrimonial", "decir falso testimonio"]
      }
    ]
  },
  {
    tags: ["Biblia", "N.T.", "Moral"],
    category: "Amor",
    dificultad: 1,
    fortext: "El mandamiento principal",
    words: [
      {
        category: "amor Trino",
        fortext: "a semejanza de Dios",
        words: ["amar a DIOS", "amar al PRÓJIMO", "amor PROPIO"],
        help: ["...con todo el corazón", "...como a ti mismo", "autoestima y cuidado personal"]
      },
      {
        category: "amor Misericordioso",
        fortext: "la miseria mueve al corazón",
        words: ["CARIDAD", "PERDÓN", "COMPASIÓN", "CLEMENCIA"],
        help: ["amor en acción", "cancelar rencor y culpa", "padecer con/por el otro", "aliviar la pena"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Moral"],
    category: "Obras de corazón espirituales",
    dificultad: 1,
    fortext: "Atender necesidades sutiles",
    words: [
      {
        category: "COMPASIVAS",
        fortext: "la miseria mueve al corazón",
        words: ["INTERCEDER", "CONSOLAR", "TOLERAR", "PERDONAR"],
        help: ["orar por otros", "dar ánimo", "sufrir con paciencia", "liberar rencor y culpa"]
      },
      {
        category: "CONDUCTUALES",
        fortext: "la miseria mueve la palabra",
        words: ["ENSEÑAR", "ACONSEJAR", "CORREGIR"],
        help: ["dar instrucción", "orientar", "señalar el error"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Moral"],
    category: "Obras de corazón corporales",
    dificultad: 1,
    fortext: "Atender necesidades urgentes",
    words: [
      {
        category: "ASISTENCIALES",
        fortext: "atender necesidades materiales",
        words: ["ALIMENTAR", "HIDRATAR", "VESTIR", "ALOJAR"],
        help: ["dar comida", "dar bebida", "dar ropa", "dar techo"]
      },
      {
        category: "PRESENCIALES",
        fortext: "atender necesidades anímico-espirituales",
        words: ["visitar al ENFERMO", "visitar al PRESO", "ENTERRAR"],
        help: ["débil de salud", "privado de la libertad", "dar sepultura"]
      }
    ]
  },
  {
    tags: ["Biblia", "A.T.","Historia","Nombres"],
    category: "Padres e Hijos",
    dificultad: 2,
    fortext: "En el Antiguo Testamento",
    words: [
      {
        category: "Génesis",
        fortext: "Los primeros elegidos de Dios",
        words: ["ADÁN & ABEL", "NOÉ & SEM", "ABRAHAM & ISAAC"],
        help: ["el primer Hombre & el primer Santo", "Constructores del arca", "Los primeros patriarcas"]
      },
      {
        category: "Israelitas",
        fortext: "De las 12 tribus al reino unido",
        words: ["JACOB & JUDÁ", "SAÚL & JONATÁN", "DAVID & SALOMÓN"],
        help: ["Israel & su hijo el León", "el primer Rey & el amigo de David", "Los constructores del Templo de Dios"]
      }
    ]
  },
  {
    tags: ["Biblia","Evangelios", "N.T.","Historia","Nombres"],
    category: "Hijo de …",
    dificultad: 2,
    fortext: "En los Evangelios",
    words: [
      {
        category: "Hijos únicos",
        fortext: "Vocaciones singulares",
        words: ["JUAN hijo de ZACARÍAS", "NATANAEL hijo de TIMEO", "JESÚS hijo de JOSÉ"],
        help: ["el más grande entre los Hombres, hijo del sacerdote", "verdadero Israelita, hijo del 'honorable'", "verdadero Dios hijo del carpintero"]
      },
      {
        category: "Hermanos Pescadores",
        fortext: "... de hombres",
        words: ["SIMÓN hijo de JUAN", "ANDRÉS hijo de JUAN", "JUAN hijo de ZEBEDEO", "SANTIAGO hijo de ZEBEDEO"],
        help: [
          "el discípulo principal, hijo de un pescador cuyo nombre significa Dios es misericordioso",
          "hermano de Pedro, hijo de un pescador cuyo nombre significa Dios es misericordioso",
          "el discípulo amado, hijo de un pescador cuyo nombre significa regalo de Dios",
          "hermano de Juan, hijo de un pescador cuyo nombre significa regalo de Dios"
        ]
      }
    ]
  },
  {
    tags: ["Biblia","Evangelios", "N.T.", "Historia"],
    category: "Intercesión Paternal",
    dificultad: 4,
    fortext: "Pedir por un 'hijo'",
    words: [
      {
        category: "Por la VIDA",
        fortext: "La súplica ante la muerte",
        words: ["el SACERDOTE pide un hijo (PROFETA)", "JAIRO pide por su hija MUERTA", "el FUNCIONARIO pide por su hijo MORIBUNDO", "la VIUDA pide por su hijo MUERTO"],
        help: [
          "«Zacarías, tu súplica ha sido escuchada» — El ángel anuncia el nacimiento de Juan",
          "«No temas; solamente ten fe» — Jesús devuelve la vida a la hija del jefe de la sinagoga",
          "«Tu hijo vive» — El padre suplica a Jesús y el hijo es curado a distancia",
          "«Joven, yo te lo mando: levántate» — Jesús se compadece de la madre y devuelve la vida a su hijo"
        ]
      },
      {
        category: "Por la SALUD",
        fortext: "La súplica ante la enfermedad",
        words: ["la CANANEA pide por su hija ENDEMONIADA", "un HUMILDE pide por su hijo POSEÍDO", "el CENTURIÓN pide por su servidor PARALÍTICO"],
        help: [
          "«¡Mujer, qué grande es tu fe!» — La madre intercede y su hija queda liberada",
          "«Creo; ayuda mi falta de fe» — El padre se presenta ante Jesús y reconoce la fragilidad de su fe",
          "«No soy digno de que entres en mi casa» — El soldado romano intercede y su servidor sana"
        ]
      }
    ]
  },
  {
    tags: ["Biblia","Evangelios", "N.T.", "Historia","Nombres"],
    category: "Comunidades",
    dificultad: 4,
    fortext: "En los Evangelios",
    words: [
      {
        category: "Judíos",
        fortext: "Jerusalén como ciudad Santa",
        words: ["FARISEOS & SADUCEOS", "ESCRIBAS & PUBLICANOS", "CELOTES & HERODIANOS", "LEVITAS & SACERDOTES"],
        help: ["¿existen los ángeles & la resurrección?", "la Ley & los impuestos", "grupos políticos", "descendientes de Leví"]
      },
      {
        category: "Gentiles",
        fortext: "Naciones / pueblos extranjeros",
        words: ["PAGANOS & SAMARITANOS", "ROMANOS & GRIEGOS", "CANANEOS & FENICIOS"],
        help: ["cultos diversos & pueblo rival", "imperio dominador & cultura helénica", "pueblos antiguos de Canaán y de la costa"]
      }
    ]
  },
  {
    tags: ["N.T.", "Biblia","Historia","Nombres"],
    category: "Escritores",
    dificultad: 1,
    fortext: "Del Nuevo Testamento",
    words: [
      {
        category: "Evangelios",
        fortext: "El Verbo se hizo carne y habitó entre nosotros",
        words: ["MATEO", "MARCOS", "LUCAS", "JUAN"],
        help: ["discípulo de Jesús", "discípulo de Pedro", "discípulo de Pablo", "el discípulo amado"]
      },
      {
        category: "Hechos, cartas & profecías",
        fortext: "La formación de la Iglesia y explicación de los Evangelios",
        words: ["PABLO & PEDRO", "SANTIAGO & JUDAS", "LUCAS & JUAN"],
        help: ["cartas apostólicas principales", "cartas universales", "Hechos de los Apóstoles & Apocalipsis"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Jesús"],
    category: "EL ES Hombre",
    dificultad: 2,
    fortext: "Vocaciones a imagen de Jesús",
    words: [
      {
        category: "Ministerios (Universales)",
        fortext: "Cristo el ungido cumple su misión divina",
        words: ["SACERDOTE", "PROFETA", "REY"],
        help: ["... altar & víctima", "anuncia la verdad", "... de Israel & del Cielo"]
      },
      {
        category: "Profesiones (Personales)",
        fortext: "Jesús trabaja por el cuerpo y por el alma de los Hombres",
        words: ["CARPINTERO & AGRICULTOR", "ABOGADO & JUEZ", "MAESTRO & LEGISLADOR", "MÉDICO & MILITAR"],
        help: ["trabaja la madera & siembra la palabra", "intercede & administra la justicia", "enseña & dicta preceptos", "... del alma & del espíritu"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Antropología","Liturgia","Tradición"],
    category: "Necesidades",
    dificultad: 2,
    fortext: "Del alma: tentaciones o bendiciones",
    words: [
      {
        category: "Cordiales",
        fortext: "Deseos de completud: una vida orientada a Dios o al mundo",
        words: ["PLACER", "POSEER", "PODER"],
        help: ["deseo de bienestar y gozo", "deseo de creación y crecimiento", "deseo de autoridad y libertad"]
      },
      {
        category: "Psicofísicas",
        fortext: "Arrepentimiento litúrgico: camino diario por la cornisa",
        words: ["PALABRA", "PENSAMIENTO", "OMISIÓN", "OBRA"],
        help: ["expresión social del lenguaje", "procesamiento de estímulos e información", "no hacer - dejar pasar", "moverse y hacer"]
      }
    ]
  },
  {
    tags: ["Oración", "María","Tradición"],
    category: "El Rosario",
    dificultad: 4,
    fortext: "Oración Mariana",
    words: [
      {
        category: "Misterios",
        fortext: "Estructura principal de meditación",
        words: ["GOZOSOS", "LUMINOSOS", "DOLOROSOS", "GLORIOSOS"],
        help: ["encarnación e infancia", "vida pública de Jesús", "pasión y muerte", "resurrección y gloria"]
      },
      {
        category: "Cierre",
        fortext: "Invocaciones y plegarias finales",
        words: ["BENDITA sea tu PUREZA", "SALVE & REGINA", "LETANÍAS de la VIRGEN"],
        help: [
          "«eternamente lo sea, pues todo un Dios se recrea en tan graciosa belleza»",
          "«Señora abogada nuestra»",
          "al final del Rosario"
        ]
      }
    ]
  },
  {
    tags: ["Oración", "María", "Jesús","Tradición"],
    category: "Misterios-I",
    dificultad: 4,
    fortext: "Del Rosario",
    words: [
      {
        category: "Gozosos",
        fortext: "El nacimiento y la infancia",
        words: ["ANUNCIACIÓN & GABRIEL", "VISITACIÓN & MAGNIFICAT", "NACIMIENTO & PESEBRE", "PRESENTACIÓN & TEMPLO", "ADOLESCENCIA & DOCTORES"],
        help: ["«El Ángel del Señor saludó a María»", "«Casa de Isabel y Juan. María canta.»", "«Partieron a Belén»", "«Simeón: mis ojos han visto la salvación»", "«El Niño perdido y hallado»"]
      },
      {
        category: "Luminosos",
        fortext: "La manifestación del Reino",
        words: ["JORDÁN & BAUTISMO", "BODAS & VINO", "REINO & CONVERSIÓN", "TRANSFIGURACIÓN & MONTE ", "EUCARISTIA & CENA"],
        help: ["«Comienzo de la vida pública de Jesús»", "«El primer milagro en Caná»", "«El anuncio del de Juan y Jesús»", "«Señor, que bien estamos aquí, armemos 3 carpas»", "«Pan, vino, caliz»"]
      }
    ]
  },
  {
    tags: ["Oración", "María", "Jesús","Tradición"],
    category: "Misterios-II",
    dificultad: 4,
    fortext: "Del Rosario",
    words: [
      {
        category: "Dolorosos",
        fortext: "La Pasión de Cristo",
        words: ["ORACIÓN & HUERTO", "FLAGELACIÓN & AZOTES", "CORONACIÓN & ESPINAS", "CRUZ & CAMINO", "CRUZ & MUERTE"],
        help: ["«Padre, si puedes librame de este caliz»", "«Lo ataron a una columna»", "«El rey de los judios»", "«Jesús cae agotado»", "«Padre, en tus manos encomiendo mi Espíritu»"]
      },
      {
        category: "Gloriosos",
        fortext: "La victoria y la gloria",
        words: ["SEPULCRO & RESURRECCIÓN", "CIELO & ASCENSIÓN", "PENTECOSTÉS & LENGUAS", "CUERPO & ALMA", "CORONA & REINA"],
        help: ["«Al tercer dia...»", "«subio al Padre»", "«50 días después de la Pascua»", "«La Asunción de María»", "«La Coronación de María»"]
      }
    ]
  },
  {
    tags: ["Biblia","N.T.","Evangelios", "Símbolos","Fisica"],
    category: "Animales",
    dificultad: 1,
    fortext: "En los Evangelios",
    words: [
      {
        category: "Dios y sus amigos",
        fortext: "Representaciones de la docilidad y la inocencia",
        words: ["OVEJA & ASNO", "CORDERO & GUSANO", "GALLINA & PALOMA"],
        help: ["dócil & testarudo", "inocente & insignificante", "...protectora & ...de la paz"]
      },
      {
        category: "El enemigo y sus amigos",
        fortext: "Representaciones del peligro y la astucia",
        words: ["CERDO & PERRO", "LOBO & ESCORPIÓN", "SERPIENTE & ZORRO", "CABRA & BUITRE"],
        help: ["impuro & voraz", "depredador & venenoso", "astutos & ventajero", "...de montaña & carroñero"]
      }
    ]
  },
  {
    tags: ["Iglesia","Catecismo","Hodos"],
    category: "Consejos",
    dificultad: 2,
    fortext: "Vías de perfección cristiana",
    words: [
      {
        category: "Evangélicos",
        fortext: "Votos de abnegación renuncia y entrega",
        words: ["CASTIDAD", "POBREZA", "OBEDIENCIA"],
        help: ["renuncia a la unión carnal", "renuncia a los bienes materiales", "renuncia a la propia voluntad"]
      },
      {
        category: "Cuaresmales",
        fortext: "Prácticas ascéticas para predisponerse a Dios",
        words: ["LIMOSNA", "ORACIÓN", "AYUNO", "CONVERSIÓN"],
        help: ["compartir bienes", "diálogo con Dios", "privación", "cambio de vida"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Ruaj","Moral"],
    category: "Dones",
    dificultad: 2,
    fortext: "del Espíritu Santo",
    words: [
      {
        category: "Intelectuales (de discernimiento)",
        fortext: "La conciencia se llena de Dios",
        words: ["SABIDURÍA","ENTENDIMIENTO", "CIENCIA", "CONSEJO"],
        help: ["saber de / discernir a Dios, saborear a Dios","saber/discernir las leyes/pensamientos de Dios", "saber/discernir la presencia de Dios", "saber/discernir la voluntad de Dios"]
      },
      {
        category: "Cordiales (del corazón)",
        fortext: "El alma se llena de Dios",
        words: [ "PIEDAD", "FORTALEZA", "TEMOR"],
        help: ["devoción, clemencia y fervor", "soportar la prueba", "respeto a Dios"]
      }
    ]
  },
    {
    tags: ["Catecismo", "Historia","Hodos"],
    category: "La historia",
    dificultad: 2,
    fortext: "de la Salvación",
    words: [
      {
        category: "Hitos universales",
        fortext: "para todos - no se pueden rechazar",
        words: ["CREACIÓN", "REDENCIÓN","PARUSÍA" ],
        help: ["alpha - obra del Padre en el Hijo", "tau - el Hijo pagó nuestros pecados","omega - el Hijo vuelve a condenar y salvar"]
      },
      {
        category: "Procesos particulares",
        fortext: "tanto + para quienes lo eligen",
        words: ["PEDAGOGÍA", "COPARTICIPACIÓN", "PROVIDENCIA", "REVELACIÓN"],
        help: ["Dios guia y enseña", "Dios envía, unge, escucha", "Dios asiste", "Dios se va quitando velos"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Moral","Antropología","Sociedad"],
    category: "Virtudes",
    dificultad: 1,
    fortext: "Capacidades que nos acercan a Dios",
    words: [
      {
        category: "Teologales",
        fortext: "ejes de todo cristiano",
        words: ["FE", "ESPERANZA", "CARIDAD"],
        help: ["creer en Dios", "confiar en las promesas", "entregar la vida"]
      },
      {
        category: "Cardinales",
        fortext: "ejes de todo hombre (San Ambrosio)",
        words: ["PRUDENCIA", "JUSTICIA", "TEMPLANZA", "FORTALEZA"],
        help: ["discernimiento", "dar a cada uno lo suyo", "autocontrol", "fuerza interior"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Moral"],
    category: "Pecados",
    dificultad: 2,
    fortext: "Acciones e intenciones que nos alejan de Dios",
    words: [
      {
        category: "Religiosos",
        fortext: "Ofensas contra la santidad divina",
        words: ["IDOLATRÍA", "PROFANACIÓN", "BLASFEMIA"],
        help: ["adorar lo creado", "tratar desacertadamente lo sagrado", "palabra injuriosa"]
      },
      {
        category: "Capitales",
        fortext: "Raíces de las tendencias desordenadas",
        words: ["GULA & AVARICIA", "ENVIDIA & IRA", "PEREZA & LUJURIA", "EGOCENTRISMO"],
        help: ["descontrol alimentario y de posesión", "tristeza del bien ajeno y furia", "desgane y descontrol sensual", "exceso de yo"]
      }
    ]
  },
  {
    tags: ["Biblia","N.T.","Evangelios", "Jesús","Símbolos"],
    category: "YO SOY",
    dificultad: 1,
    fortext: "Jesús se auto definió con estos símbolos",
    words: [
      {
        category: "del CIELO",
        fortext: "Atributos eternos y de salvación",
        words: ["RESURRECCIÓN & VIDA", "LUZ", "VIA & VERDAD"],
        help: ["...gloriosa & ...eterna", "...del mundo", "...y vida"]
      },
      {
        category: "del CAMPO",
        fortext: "Símbolos cotidianos y de sostén",
        words: ["PAN", "VID", "PASTOR", "PUERTA"],
        help: ["...de vida", "...verdadera", "el buen...", "...del corral"]
      }
    ]
  },
  {
    tags: ["Iglesia", "María","Tradición","Liturgia"],
    category: "Fiestas Marianas",
    dificultad: 3,
    fortext: "celebraciones en el calendario",
    words: [
      {
        category: "TÍTULOS",
        fortext: "Bendita entre todas las mujeres",
        words: ["MADRE", "ESPOSA", "REINA"],
        help: ["...de la Iglesia", "...del Espíritu Santo", "...de la Creación"]
      },
      {
        category: "DOGMAS",
        fortext: "verdades de fe definitivas",
        words: ["MADRE", "VIRGEN", "INMACULADA", "ASUNTA"],
        help: ["...de Dios (Theotokos)", "...perpetua", "...concepción", "...a los cielos"]
      }
    ]
  },
  {
    tags: ["Iglesia","Oración", "María","Tradición"],
    category: "Letanías Marianas",
    dificultad: 4,
    fortext: "Títulos y Virtudes",
    words: [
      {
        category: "MADRE de Dios",
        fortext: "Invocaciones a la morada del Salvador",
        words: ["ARCA", "TABERNÁCULO", "CASA & SEDE"],
        help: ["...de la alianza", "...de la eterna gloria", "...de oro & ...de la sabiduría"]
      },
      {
        category: "REINA de la Creación",
        fortext: "Invocaciones a la intercesora celestial",
        words: ["ESPEJO", "ROSA", "ESTRELLA", "REFUGIO & PUERTA"],
        help: ["...de justicia", "...mística", "...de la mañana", "...de los pecadores & ...del cielo"]
      }
    ]
  },
  {
    tags: ["Evangelios","Historia","Tradición","Nombres"],
    category: "Apóstoles",
    dificultad: 2,
    fortext: "Los 14 elegidos",
    words: [
      {
        category: "Los primeros 6",
        fortext: "4 hermanos y 2 amigos",

        words: ["PEDRO & ANDRÉS", "SANTIAGO & JUAN","FELIPE & BARTOLOMÉ"],
        help: ["pescadores de hombres", "hijos del trueno","(Jn 1) ven y verás"]
      },
      {
        category: "El resto",
        fortext: "Diversidad de carismas",
        words: [ "TOMÁS & MATEO", "SANTIAGO & TADEO", "SIMÓN & JUDAS", "PABLO & MATÍAS"],
        help: [ "el incrédulo & el publicano (rico)", "el menor (discreto) & Judas (reflexivo)", "el zelote (nacionalista) & el tesorero (traidor)", "perseguidor de cristianos & el elegido al azar"]
      }
    ]
  },

  {
    tags: ["Iglesia", "Liturgia","Historia","Hodos","Tradición"],
    category: "Tiempo Litúrgico",
    dificultad: 1,
    fortext: "El calendario de la Iglesia",
    words: [
      {
        category: "Fiestas",
        fortext: "Grandes solemnidades de la salvación",
        words: ["NAVIDAD", "PASCUA", "PENTECOSTÉS"],
        help: ["nacimiento de Jesús", "resurrección del Señor", "venida del Espíritu Santo"]
      },
      {
        category: "Preparación",
        fortext: "Tiempos de espera",
        words: ["ORDINARIO", "ADVIENTO", "CUARESMA", "SEMANA Santa"],
        help: ["tiempo común", "espera de la venida", "cuarenta días de preparación", "pasión & muerte"]
      }
    ]
  },
  {
    tags: ["Biblia","N.T.","Evangelios", "Jesús","Moral"],
    category: "Beatitúdines",
    dificultad: 1,
    fortext: "Dichosos los que (tienen) …",
    words: [
      {
        category: "Corazón",
        fortext: "Actitudes interiores bendecidas",
        words: ["corazón PURO", "corazón POBRE", "corazón MANSO"],
        help: ["porque verán a Dios", "porque a ellos les pertenece el Reino de los Cielos", "porque poseerán la tierra"]
      },
      {
        category: "Justicia",
        fortext: "Compromiso y prueba por la verdad",
        words: ["HAMBRE de justicia", "PERDONAN in-justicias", "TRABAJAN por la justicia", "SUFREN in-justicias"],
        help: ["y sed", "misericordiosas", "y la paz", "a causa de mi nombre"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Símbolos","Fisica","Biblia","N.T."],
    category: "Naturaleza",
    dificultad: 1,
    fortext: "Símbolos de Dios",
    words: [
      {
        category: "Animales",
        fortext: "Criaturas con carga teológica",
        words: ["PALOMA", "LEÓN", "CORDERO"],
        help: ["...de la paz", "...de Judá", "...que quita el pecado del mundo"]
      },
      {
        category: "Elementos",
        fortext: "Fuerzas naturales reveladoras",
        words: ["LUZ", "AGUA", "AIRE", "FUEGO"],
        help: ["ilumina", "hidrata", "oxigena", "transforma"],
        PN: false
      }
    ]
  },
  {
    tags: ["Iglesia","Sociedad", "Moral"],
    category: "juicio Civil",
    dificultad: 3,
    fortext: "Variables de las que depende el juicio",
    words: [
      {
        category: "Punibilidad",
        fortext: "Condiciones de imputabilidad moral",
        words: ["CONCIENCIA", "GRAVEDAD", "CONSENTIMIENTO"],
        help: ["entendimiento", "venial o mortal", "intención"]
      },
      {
        category: "Agravamiento o Ayuda",
        fortext: "Elementos modificadores de la falta",
        words: ["CONTEXTO", "CONTRICIÓN", "CONDUCTA", "CONVERSIÓN"],
        help: ["circunstancia", "arrepentimiento", "premio", "transformación"]
      }
    ]
  },
  {
    tags: ["Biblia", "Historia","Nombres"],
    category: "Embarazos Milagrosos",
    dificultad: 2,
    fortext: "Nombres de madres y/o hijos",
    words: [
      {
        category: "N.T.",
        fortext: "Nacimientos del anuncio del Reino",
        words: ["ISABEL & JUAN", "MARÍA & JESÚS"],
        help: ["Familia de Zacarías", "Familia de José"]
      },
      {
        category: "A.T.",
        fortext: "Nacimientos extraordinarios de la Alianza",
        words: ["ANA & SAMUEL", "SARA & ISAAC", "REBECA & JACOB","RAQUEL & JOSÉ","SANSÓN"],
        help: ["Consagrado al templo", "Familia de Abraham","Familia de Isaac","Familia de Jacob", "no le pueden cortar el pelo"]
      }
    ]
  },
  {
    tags: ["Logos","Catecismo", "Jesús"],
    category: "El ES Dios",
    dificultad: 2,
    fortext: "2da persona de la Trinidad",
    words: [
      {
        category: "LOGOS",
        fortext: "Traducciones del infinito (Jn 1,1-14)",
        words: ["PRINCIPIO & FIN", "SABIDURÍA", "VERBO", "PALABRA"],
        help: ["alpha & omega", "(Jn 1,3) sin ella no se hizo nada de todo lo que existe", "(Jn 1,14) ...se hizo carne y habitó entre nosotros", "(Jn 1,9) ...era la luz verdadera que ilumina a todo hombre"]
      },
      {
        category: "Dios & Hombre",
        fortext: "Alguién vio a Dios? (Jn 1,17-18)",
        words: ["JESUCRISTO", "hijo UNIGÉNITO", "DIOS"],
        help: ["Dios tiene 1 nombre y 1 rostro", "único engendrado que reveló a Dios", "nadie le vio jamás"]
      }
    ]
  },
  {
    tags: ["Biblia","Evangelios","N.T.", "Jesús"],
    category: "TU ERES",
    dificultad: 3,
    fortext: "Verdadero Dios & Verdadero Hombre",
    words: [
      {
        category: "Hijo de Dios",
        fortext: "Confesiones de FE",
        words: ["SEÑOR mio & DIOS mio", "CORDERO de Dios & SANTO de Dios", "SALVADOR & CRISTO"],
        help: ["confesado por Tomás el incrédulo", "confesado por Juan Bautista & Pedro & los demonios", "confesado por los samaritanos & Pedro & Andrés"]
      },
      {
        category: "Hijo del Hombre",
        fortext: "Reconocimiento histórico",
        words: ["Hijo de MARÍA & Hijo del CARPINTERO", "MAESTRO & PROFETA", "Hijo de ABRAHAM & Hijo de DAVID", "NAZARENO & REY de Israel"],
        help: ["dicho por los Nazarenos", "dicho por Natanael & la multitud", "dicho por Mateo & la multitud", "dicho por Natanael & los demonios"]
      }
    ]
  },
  {
    tags: ["Liturgia", "Oración", "Catecismo","Biblia","N.T."],
    category: "Padre Nuestro",
    dificultad: 1,
    fortext: "peticiones por Dios o por el Hombre",
    words: [
      {
        category: "TEOCÉNTRICAS",
        fortext: "Orientadas a la gloria divina",
        words: ["NOMBRE", "REINO", "VOLUNTAD"],
        help: ["santificado sea tu...", "venga a nosotros tu...", "hágase tu..."]
      },
      {
        category: "ANTROPOCÉNTRICAS",
        fortext: "Orientadas a las necesidades humanas",
        words: ["PAN", "OFENSAS", "TENTACIÓN", "MALIGNO"],
        help: ["...de cada día", "perdona nuestras...", "no nos dejes caer en la...", "líbranos del..."]
      }
    ]
  },
  {
    tags: ["Iglesia", "Catecismo"],
    category: "1 Iglesia",
    dificultad: 2,
    fortext: "Cuerpo místico de Cristo (1 esposa)",
    words: [
      {
        category: "1 solo",
        fortext: "Unicidad & Unidad",
        words: ["SEÑOR & BAUTISMO & FE", "CUERPO & ESPÍRITU", "ALMA", "CARNE"],
        help: ["Credo largo - Efesios 4", "la Iglesia y Dios (Efesios 4)", "...entre los creyentes (Hechos)", "...entre varón y mujer"]
      },
      {
        category: "diversidad",
        fortext: "Variedad de dones comunitarios",
        words: ["LENGUAS", "CARISMAS", "MINISTERIOS"],
        help: ["idiomas", "dones espirituales", "servicios en la comunidad"]
      }
    ]
  },
  {
    tags: ["Logos", "Biblia","N.T.","Evangelios"],
    category: "Griego",
    dificultad: 3,
    fortext: "El idioma de los evangelios",
    words: [
      {
        category: "DIVINO & HUMANO",
        fortext: "Términos filosóficos y teológicos",
        words: ["LOGOS & LÓGICA", "THEOS & ÁNTROPOS", "URANOS & KOSMOS", "KAIROS & CRONOS"],
        help: ["sabiduría de dios & del hombre", "dios & hombre", "cielo & mundo", "tiempo denso & cíclico"]
      },
      {
        category: "VIEJO & NUEVO",
        fortext: "Conceptos de la existencia y vida",
        words: ["SARX & SOMA", "BIOS & ZOE", "PSIQUE & PNEUMA"],
        help: ["carne & cuerpo", "vida corrompible & eterna", "alma (ánima) & espíritu (soplo)"]
      }
    ]
  },
  {
    tags: [ "Hodos","Logos","Catequesis"],
    category: "Theosis",
    dificultad: 3,
    fortext: "Vías de participación de la naturaleza divina",
    words: [
      {
        category: "Bíblicas",
        fortext: "Hitos bíblicos de revelación",
        words: ["GÉNESIS", "KENOSIS", "APOCALIPSIS"],
        help: ["nacimiento-origen", "abajamiento", "revelación"]
      },
      {
        category: "conversión",
        fortext: "Pasos en el camino espiritual",
        words: ["PRAXIS", "CATARSIS", "ASCESIS", "GNOSIS"],
        help: ["práctica", "purificación", "disciplina", "conocimiento"]
      }
    ]
  },
  {
    tags: ["Liturgia", "Iglesia"],
    category: "Ofrendas",
    dificultad: 2,
    fortext: "dones del Hombre a Dios",
    words: [
      {
        category: "Pesebre",
        fortext: "Regalos de los Reyes Magos",
        words: ["ORO", "INCIENSO", "MIRRA"],
        help: ["porque Jesús es Rey", "porque Jesús es Dios y ascenderá al Cielo", "porque Jesús es Hombre y sufrirá una muerte."]
      },
      {
        category: "Misa",
        fortext: "Entregas en la Eucaristía",
        words: ["TIEMPO & DINERO", "TRABAJO & FATIGA", "CUERPO & SANGRE", "ALEGRÍA & SUFRIMIENTO"],
        help: ["lo valioso de este mundo", "...de la jornada", "...de Cristo - Memorial del Sacrificio incruento", "cantos & llantos"]
      }
    ]
  },
  {
    tags: ["Iglesia","Logos","Símbolos","Catequesis"],
    category: "UNO",
    dificultad: 2,
    fortext: "Expresiones del entero",
    words: [
      {
        category: "CREADOR & CRIATURA",
        fortext: "Unicidad en la Creación y el Hijo",
        words: ["ÚNICO", "UNIGÉNITO", "UNIVERSO"],
        help: ["Dios trino y ...", "(1Jn 4,9) Dios ha enviado a su Hijo…", "La única versión de La Creación"]
      },
      {
        category: "IGLESIA",
        fortext: "Unidad del pueblo congregado",
        words: ["UNÁNIME", "UNIVERSIDAD", "UNIVERSAL", "UNIDAD"],
        help: ["(Hch 4,32) Eran una sola alma", "Institución de estudios superiores", "católico", "... en la diversidad representada por la cabeza"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Moral","Antropología"],
    category: "Facultades",
    dificultad: 3,
    fortext: "y características constitutivas del ser humano",
    words: [
      {
        category: "Teológicas",
        fortext: "de los hijos de Dios (imagen & semejanza)",
        words: ["INTELIGENCIA", "CONCIENCIA", "VOLUNTAD", "DIGNIDAD"],
        help: [
          "imagen & semejanza de la OMNIsapiencia de Dios",
          "imagen & semejanza de la OMNIpresencia de Dios",
          "imagen & semejanza de la OMNIpotencia de Dios",
          "imagen & semejanza de Dios Hijo"
        ]
      },
      {
        category: "Antropológicas",
        fortext: "de los hijos de Adán (frutos del pecado)",
        words: ["DEPENDENCIA", "ERRANCIA", "CONCUPISCENCIA"],
        help: [
          "sin ayuda de otros no podemos",
          "Pecadores",
          "Debilidad"
        ]
      }
    ]
  },
  {
    tags: ["Biblia", "A.T.","N.T."],
    category: "Geografía",
    dificultad: 2,
    fortext: "en la Tierra Prometida",
    words: [
      {
        category: "Agradables",
        fortext: "Lugares de bendición y vida",
        words: ["JARDÍN", "BOSQUE", "CAMPO", "RÍO"],
        help: ["...del Edén", "...del Líbano", "...de trigo", "...Jordán"]
      },
      {
        category: "Hostiles",
        fortext: "Lugares de prueba y retiro",
        words: ["DESIERTO", "MAR", "MONTE"],
        help: ["...de Judea", "...de Galilea (lago)", "...Tabor"]
      }
    ]
  },
  {
    tags: ["Biblia","Evangelios", "N.T.","Jesús"],
    category: "Lugares",
    dificultad: 2,
    fortext: "visitados por Jesús",
    words: [
      {
        category: "Tierra",
        fortext: "Escenarios urbanos, protegidos",
        words: ["CIUDAD", "TEMPLO", "CASA", "HUERTO"],
        help: ["...amurallada", "...de Jerusalén", "...de la suegra de Pedro", "...de los olivos"]
      },
      {
        category: "Agua",
        fortext: "Dulce vs Salada",
        words: ["POZO", "BARCA", "PISCINA"],
        help: ["...de Jacob", "...de los pescadores", "...de Betesda"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Ruaj","Moral"],
    category: "Frutos",
    dificultad: 4,
    fortext: "del Espíritu Santo",
    words: [
      {
        category: "Vida interior",
        fortext: "Dios dentro de uno",
        words: ["CONTINENCIA & TEMPLANZA", "MODESTIA & HUMILDAD", "MAGNANIMIDAD & LONGANIMIDAD", "PAZ & GOZO"],
        help: [
          "dominio de sí",
          "No agrandar las capacidades personales y reconocimiento de los propios límites",
          "alma grande & perseverante",
          "armonía & felicidad"
        ]
      },
      {
        category: "Vínculo fraterno",
        fortext: "reflejo divino en la relación con el prójimo",
        words: ["BONDAD & BENEVOLENCIA", "AFABILIDAD & GENEROSIDAD", "MANSEDUMBRE & ALEGRÍA", "FIDELIDAD & PACIENCIA"],
        help: [
          "hacer & querer el bien",
          "buen trato & entrega desinteresada",
          "no genera problemas & contagia una sonrisa",
          "permanencia & tolerancia"
        ]
      }
    ]
  },
  {
    tags: ["Sociedad", "Historia", "Ruaj","Nombres"],
    category: "Religiones",
    dificultad: 1,
    fortext: "y filosofías de vida",
    words: [
      {
        category: "Monoteístas",
        fortext: "Fe en el Dios de Abraham",
        words: ["CRISTIANISMO", "JUDAÍSMO", "ISLAM"],
        help: ["✝️ dios uno & trino", "✡️ pueblo elegido", "☪️ siervos de Dios"]
      },
      {
        category: "Pre-cristianas",
        fortext: "Tradiciones antiguas y espiritualidades",
        words: ["TAOÍSMO", "BUDISMO", "HINDUÍSMO", "POLITEÍSMO griego"],
        help: ["☯️ parte del todo", "☸️ nirvana", "🕉️ intimidad con Dios", "🏛️ drama mitológico"]
      }
    ]
  },
  {
    tags: ["Iglesia", "Catecismo", "Oración", "Ruaj","Liturgia","Tradición"],
    category: "Creo en el Espíritu Santo",
    dificultad: 2,
    fortext: "Profesión de fe",
    words: [
      {
        category: "Credo Niceno Constantinopolitano",
        fortext: "Afirmaciones de la fe ecuménica",
        words: ["PROCEDE", "misma ADORACIÓN & GLORIA", "HABLÓ"],
        help: ["...del Padre y del Hijo (Filioqué)", "que el Padre y el Hijo", "por los Profetas"]
      },
      {
        category: "Credo de los Apóstoles",
        fortext: "Síntesis del bautismo apostólico",
        words: ["santa IGLESIA", "COMUNIÓN", "PERDÓN", "RESURRECCIÓN"],
        help: ["católica", "...de los SANTOS", "...de los PECADOS", "...de la carne"]
      }
    ]
  },
  {
    tags: ["Iglesia", "Catecismo", "Jesús", "Oración","Liturgia","Tradición"],
    category: "Creo en Jesucristo",
    dificultad: 2,
    fortext: "Profesión de fe",
    words: [
      {
        category: "Credo Niceno Constantinopolitano",
        fortext: "Dogmas sobre el Hijo",
        words: ["ENGENDRADO", "ENCARNÓ", "misma NATURALEZA"],
        help: ["no creado", "en el seno de María", "del Padre"]
      },
      {
        category: "Credo de los Apóstoles",
        fortext: "Misterio pascual y venida final",
        words: ["fue CRUCIFICADO", "RESUCITÓ", "está SENTADO", "venir a JUZGAR"],
        help: ["...muerto y sepultado", "...de entre los muertos", "...a la derecha de Dios Padre", "...a vivos y muertos"]
      }
    ]
  },
  {
    tags: ["Biblia", "A.T.","Historia","Nombres"],
    category: "Hebreos elegidos",
    dificultad: 2,
    fortext: "para preparar la llegada del Mesías",
    words: [
      {
        category: "Ancestros",
        fortext: "Dios elige para su Hijo un pueblo, un linaje, una tierra",
        words: ["ABRAHAM", "DAVID", "ZOROBABEL"],
        help: [
          "de Pastor a Patriarca - 1er Altar - prefiguró el sacerdocio de Jesús",
          "de Pastor a Rey - 1er Templo - prefiguró la realeza de Jesús",
          "de exiliado a gobernador - 2do Templo - prefiguró la resurrección de Jesús"
        ]
      },
      {
        category: "Profetas",
        fortext: "Dios elige para su pueblo anunciadores de Su Palabra",
        words: ["MOISÉS", "ELÍAS", "JEREMÍAS", "JUAN"],
        help: [
          "anunció la liberación de Israel & prefiguró la Ley de Jesús",
          "anunció al Dios verdadero & prefiguró la Ascensión de Jesús",
          "anunció la condenación de Judá & prefiguró el sufrimiento de Jesús",
          "anunció la llegada del Mesías & prefiguró la parresía de Jesús"
        ]
      }
    ]
  },
  {
    tags: ["Catequesis", "Sacramentos","Hodos","Tradición"],
    category: "Desarrollo Cristiano",
    dificultad: 1,
    fortext: "etapas evolutivas en la vida de fe",
    words: [
      {
        category: "Sacramental",
        fortext: "hitos con la iglesia",
        words: [
          "BAUTISMO & RECONCILIACIÓN",
          "COMUNIÓN",
          "CONFIRMACIÓN & UNCIÓN",
          "CONSAGRACIÓN"
        ],
        help: [
          "Morir en la cruz - nacer en Cristo",
          "Alimento de la fe - Sacrificio pascual",
          "Expresión de palabras y obras - Vida pentecostal",
          "Alianza con Dios - Vida restringida en el mundo, abierta en el cielo"
        ]
      },
      {
        category: "Personal",
        fortext: "crecimiento en santidad",
        words: ["CONVERSIÓN", "FORMACIÓN", "MISIÓN"],
        help: [
          "cambios que nos acercan a vivir según Dios",
          "contemplación de los misterios de Dios",
          "vivir para Dios - servirlo"
        ]
      }
    ]
  },
  {
    tags: ["Catequesis","Antropología", "Sacramentos","Tradición"],
    category: "Desarrollo Humano",
    dificultad: 2,
    fortext: "etapas evolutivas & sacramentos característicos",
    words: [
      {
        category: "Biológico",
        fortext: "crecimiento del cuerpo físico",
        words: [
          "INFANCIA & BAUTISMO",
          "NIÑEZ & COMUNIÓN",
          "ADOLESCENCIA & CONFIRMACIÓN"
        ],
        help: [
          "desarrollo de la motricidad & escucha & locución",
          "desarrollo de la lectura & escritura & costumbres",
          "desarrollo de la sexualidad & moralidad & amistad"
        ]
      },
      {
        category: "Espiritual",
        fortext: "maduración del alma",
        words: [
          "JUVENTUD & CONSAGRACIÓN",
          "ADULTEZ & RECONCILIACIÓN",
          "ANCIANIDAD & UNCIÓN"
        ],
        help: [
          "etapa de desiciones & emancipación",
          "etapa de trabajo & servicio",
          "etapa de descanso & reflexión"
        ]
      }
    ]
  },
  {
    tags: ["Catequesis","Física", "Símbolos"],
    category: "Agua Dulce",
    dificultad: 1,
    fortext: "Fuentes de vida",
    words: [
      {
        category: "Aire",
        fortext: "Se mueven arriba",
        words: ["NIEVE", "LLUVIA", "NUBE"],
        help: ["Blanca como lana", "Hace germinar la tierra", "Vapor concentrado"]
      },
      {
        category: "Tierra",
        fortext: "Reservorios naturales",
        words: ["GLACIAR", "RÍO", "LAGO", "MANANTIAL"],
        help: ["Imponente masa de hielo", "Desciende hacia el mar", "Agua rodeada de tierra", "Fuente que brota de la tierra"]
      }
    ]
  },
  {
    tags: ["Catequesis","Física", "Símbolos"],
    category: "Lo Solar",
    dificultad: 2,
    fortext: "Apareció una mujer vestida de Sol",
    words: [
      {
        category: "Fusión Nuclear",
        fortext: "El fuego de las estrellas",
        words: ["PLASMA", "RADIACIÓN", "MASA"],
        help: ["Más que fuego", "Ondas de luz invisible", "Atrae a los planetas"]
      },
      {
        category: "Efectos en la Tierra",
        fortext: "Lo que vemos/sentimos debido al Sol",
        words: ["DÍA", "CALOR", "LUZ", "BRILLO"],
        help: ["Cuando sale el Sol", "Vibración térmica", "Ilumina las tinieblas", "Resplandor"]
      }
    ]
  },
  {
    tags: ["Catequesis","Física", "Símbolos","Biblia", "A.T.","N.T."],
    category: "Lo Aéreo",
    dificultad: 2,
    fortext: "El Espíritu es como el viento", //Movimiento que no deja rastros
    words: [
      {
        category: "Ruaj",
        fortext: "Lo que se mueve",
        words: ["VIENTO", "BRISA", "PNEUMA"],
        help: ["No sabes de dónde viene ni adónde va", "…suave", "Espíritu"]
      },
      {
        category: "Sale de la boca",
        fortext: "Se debe respirar",
        words: ["SOPLO", "ALIENTO", "ALABANZA", "VOZ"],
        help: [
          "… de Dios navegaba sobre las aguas",
          "Hálito de vida anímica",
          "Quien canta reza dos veces",
          "…que clama en el desierto: Allanen los caminos del Señor"
        ]
      }
    ]
  },
  {
    tags: ["Catequesis","Física", "Símbolos","Biblia"],
    category: "Lo Térreo",
    dificultad: 2,
    fortext: "Elemento y lugar de trabajo",
    words: [
      {
        category: "Materia (In)Orgánica",
        fortext: "firme, útil, contenedor",
        words: ["POZO & HUERTO", "ROCA & SAL", "BARRO & HUMUS"],
        help: ["Agua escondida & tierra fértil", "…minerales", "Humano: polvo + agua"]
      },
      {
        category: "Geografía",
        fortext: "El suelo y sus formas",
        words: ["CUEVA & SEPULCRO", "CAMPO & PRADERA", "MONTAÑA & VALLE", "DESIERTO & OASIS"],
        help: ["Lugares oscuros & de reposo", "…de cultivo & hierbas", "Elevación & declive", "Arena & vida"]
      }
    ]
  },
  {
    tags: ["Catequesis","Física", "Símbolos","Biblia","N.T.","Evangelios"],
    category: "Agricultura",
    dificultad: 1,
    fortext: "En los Evangelios",
    words: [
      {
        category: "Genéricos",
        fortext: "La vida que nace de la tierra",
        words: ["SEMILLA & FRUTO", "RAÍZ & ÁRBOL", "CAMPO & PRADERA"],
        help: ["Lo que se siembra & lo que se recoge", "Lo que sostiene & lo que crece", "«…de cultivo & hierbas»"]
      },
      {
        category: "Específicos",
        fortext: "Plantas de las parábolas y de la vida de Jesús",
        words: ["VID & SARMIENTO", "TRIGO & CIZAÑA", "OLIVO & MOSTAZA", "SICÓMORO & HIGUERA"],
        help: [
          "Permanezcan en mí",
          "Crecerán juntos hasta la cosecha",
          "Aceite & la semilla más pequeña",
          "El árbol de Zaqueo & el árbol que no da frutos"
        ]
      }
    ]
  },
  {
    tags: ["Hodos", "Catequesis", "Biblia", "Logos"],
    category: "-α & ω+",
    dificultad: 3,
    fortext: "Antes y después del tiempo",
    words: [
      {
        category: "Génesis",
        fortext: "En el principio…",
        words: ["PENSAMIENTO", "DECISIÓN", "CREACIÓN"],
        help: ["...con sentido - Logos", "...libre & sempiterna - Fiat - El 'si' de Dios", "obra de Dios"]
      },
      {
        category: "Revelación",
        fortext: "Lo oculto sale a la luz",
        words: [ "MATRIMONIO","GNOSIS", "ALABANZA", "DESCANSO"],
        help: ["Las bodas del cordero","«Lo veremos tal cual es» — 1 Jn 3,2","","Les voy a prepara habitaciones a la casa de mi padre" ]
      }
    ]
  },
  {
    tags: ["Hodos", "Biblia", "N.T."],
    category: "La Cruz",
    dificultad: 2,
    fortext: "El árbol de la vida",
    words: [
      {
        category: "Pascua",
        fortext: "del Cordero",
        words: ["PASIÓN", "MUERTE", "RESURRECCIÓN"],
        help: ["«Padre, si es posible, que pase de mí este cáliz»", "«Padre, en tus manos encomiendo mi Espíritu»", "«avisen a mis hermanos que vayan a Galilea»"]
      },
      {
        category: "Salvación",
        fortext: "del Hombre",
        words: ["REDENCIÓN", "SANTIFICACIÓN", "JUICIO", "ASCENSIÓN"],
        help: ["el Cordero que quita los pecados del mundo", "«si me voy les enviaré el Paráclito»", "«separaré las ovejas a mi derecha, las cabras a mi izquierda»", "«María nos abre el camino»"]
      }
    ]
  },
  {
    tags: ["Liturgia", "Iglesia", "Oración"],
    category: "GLORIA",
    dificultad: 1,
    fortext: "en la Misa",
    words: [
      {
        category: "Al PADRE",
        fortext: "Todopoderoso",
        words: ["Te ALABAMOS", "Te BENDICIMOS", "Te ADORAMOS", "Te AGRADECEMOS"],
        help: ["«…con nuestro canto»", "«…con nuestras palabras»", "«..en nuestro corazón»", "«…por tu inmensa gloria»"]
      },
      {
        category: "Al HIJO",
        fortext: "nuestro Señor",
        words: ["PIEDAD", "PECADO", "SÚPLICA"],
        help: ["«…de nosotros»", "«Tú que quitas el…»", "«Atiende nuestra…»"]
      }
    ]
  },
  {
    tags: ["Símbolos", "catequesis", "física"],
    category: "Infinito",
    dificultad: 3,
    fortext: "que no tiene fin",
    words: [
      {
        category: "temporal",
        fortext: "cronos",
        words: ["ETERNO", "SEMPITERNO", "PERPETUO"],
        help: ["«ni principio ni fin, fuera del tiempo»", "«con principio, sin fin»", "«en el tiempo para siempre»"]
      },
      {
        category: "espacial",
        fortext: "kosmos",
        words: ["ABISMO", "INMENSO", "INAGOTABLE", "INSONDABLE"],
        help: ["«la tierra era caos y confusión, oscuridad cubría el …»", "que no tiene medida", "que no se agota", "que no se puede sondear"]
      }
    ]
  },
  {
    tags: ["Historia", "A.T.", "Biblia","Nombres"],
    category: "HERMANOS",
    dificultad: 2,
    fortext: "En el Antiguo Testamento",
    words: [
      {
        category: "Unidos",
        fortext: "Con leves conflictos",
        words: ["ISMAEL & ISAAC", "JUDÁ & BENJAMÍN", "AARÓN & MOISÉS"],
        help: ["Hijos de Abraham", "Hijos de Jacob", "Hermanos del Éxodo"]
      },
      {
        category: "Fratricidio",
        fortext: "Intento o ejecución",
        words: ["ABEL & CAÍN", "ESAÚ & JACOB", "LEVÍ & JOSÉ", "SALOMÓN & ADONÍAS"],
        help: ["Celos por la ofrenda. Primera muerte", "Engaño por la bendición del padre", "Celos por el afecto del padre. El pozo y los compradores de esclavos", "Traición, Poder, Lujuria. El trono de Judá"]
      }
    ]
  },
      {
    tags: ["Catecismo"],
    category: "Gracias",
    dificultad: 2,
    fortext: "Alabado seas mi Señor",
    words: [
      {
        category: "En el principio",
        fortext: "Génesis - alpha ",
        words: ["me PENSASTE", "me ELEGISTE", "me CREASTE"],
        help: ["...con sentido & misión", "...libremente y eternamente", "...a imagen y semejanza tuya"]
      },
      {
        category: "En el fin",
        fortext: "Parusía - omega ",
        words: ["me JUZGARÁS","me SALVARÁS","me SANTIFICARÁS","te REVELARÁS"],
        help: ["...con tu misericordia o con mis obras", "...del enemigo y del infierno", "purificando mi alma y llenándome de tu espíritu", "...y te veré tal cual sos"]
      }
    ]
  },
{
tags: ["Liturgia", "Biblia"],
category: "NAVIDAD",
dificultad: 1,
fortext: "El Verbo se hizo carne",
words: [
{
category: "Adviento",
fortext: "Liturgia de Preparación",
words: ["ESPERANZA","PAZ","ALEGRÍA","AMOR"],
help: [
"... no defrauda (Rom 5,5)",
"«...a los hombres que Dios ama» (Lc 2,14)",
"«Os anuncio una gran ...» (Lc 2,10)",
"«Dios envió al mundo a su Hijo único» (1Jn 4,9)"
]
},
{
category: "Epifanía",
fortext: "Manifestación de Cristo",
words: ["BELÉN","PESEBRE","OFRENDAS"],
help: [
"Casa de pan",
"«no había lugar en las posadas»",
"«Oro, incienso y mirra» (Mt 2,11)"
]
}
]
},

{
tags: ["Biblia","N.T.","Evangelios","Tradición"],
category: "EPIFANÍA",
dificultad: 1,
fortext: "La manifestación del Señor",
words: [
{
  category: "Reyes",
  fortext: "Los Magos de Oriente",
  words: ["MELCHOR","GASPAR","BALTASAR","HERODES"],
  help: [
    "El anciano de barba blanca; lleva el oro",
    "El joven; lleva el incienso",
    "El de edad madura; lleva la mirra",
    "Quería saber dónde estaba el Rey de los judíos"
  ]
},
{
category: "Pesebre",
fortext: "La humilde morada de nuestro corazón",
words: ["PASTORES","ÁNGELES","BUEY","ASNO"],
help: [
"«Había unos ... en aquella región» — Lc 2,8",
"«Apareció una legión del ejército celestial» — Lc 2,13",
"«El ... conoce a su dueño» — Is 1,3",
"«El ..., el pesebre de su amo» — Is 1,3"
]
}
]
},
{
tags: ["Hodos", "Biblia","Tradición"],
category: "Lo Viejo",
dificultad: 1,
fortext: "no habrá más",
words: [
{
category: "en la Tierra",
fortext: "ciudad firme, santa e iluminada",
words: ["MAR & SED","TEMPLO & PUERTAS cerradas","NOCHE & OSCURIDAD"],
help: [
"Se terminó la pezca (Ap 21,1) - «Le daré de beber agua de vida» — (Ap 21,6)",
"Casa de Dios (Ap 21,22)",
"«La ciudad no necesita luz del sol ni de la luna» (Ap 21,23)"
]
},
{
category: "en el alma",
fortext: "Cielo",
words: ["MUERTE & LAMENTO","LLANTO & DOLOR","MALDAD & MENTIRA","IMPUREZA & MANCHA"],
help: [
"solo bendición (Ap 22,3)",
"corrupción & queja (Ap 21,4)",
"lágrimas & sufrimiento (Ap 21,4)",
"todo blanco como la nieve (Ap 21,8;27)"
]
}
]
},
{
  tags: ["Catequesis", "Símbolos","Ruaj","Tradición"],
  category: "3era Persona",
  dificultad: 2,
  fortext: "de la Trinidad",
  words: [
  {
  category: "Nombres",
  fortext: "Lo que se mueve y no se ve",
  words: [
  "AMOR & ESPÍRITU",
  "DON & PROMESA",
  "PARÁCLITO & CONSOLADOR"
  ],
  help: [
  "«El ... de Dios ha sido derramado por el ... Santo» (Rom 5,5)",
  "Regalo hoy y mañana - «Recibiréis el ... del Espíritu Santo» (Hch 2,38)",
  "Abogado defensor & abrazo del alma (Jn 14,16.26)"
  ]
  },
  {
  category: "Elementos",
  fortext: "Signos visibles del Espíritu",
  words: [
  "VIENTO & SOPLO",
  "AGUA & FUEGO",
  "DEDO"
  ],
  help: [
  "«El Espíritu de Dios navegaba sobre las aguas» (Gn 1,2)",
  "«Nacer de .. y de ...» (Jn 3,5)",
  "«Yo expulso los demonios con el ... de Dios» (Lc 11,20)"
  ]
  }
  ]
},
{
tags: ["Biblia",],
category: "MI NOMBRE",
dificultad: 1,
fortext: "sea santificado",
words: [
{
category: "Antiguo Testamento",
fortext: "El Dios de Israel",
words: ["YAHVEH", "JEHOVÁ", "EL"],
help: [
"«Yo soy el que soy» — Ex 3,14",
"Transliteración tradicional de YHWH",
"EmanuEL, IsraEL, IsmaEL, GabriEL, MiguEL, RafaEL"
]
},
{
category: "Nuevo Testamento",
fortext: "El nombre del Hijo",
words: [ "JESUCRISTO",  "JESÚS","EMANUEL","NAZARENO"],
help: [
"«Genealogía de ..., hijo de David, hijo de Abraham» (Mt 1,1) - El ungido",
"«Ella dará a luz un hijo al que pondrás por nombre ...» (Mt 1,21) - El salvador",
"«Dios con nosotros» — Mt 1,23",
"«Así se cumplió lo que había sido anunciado por los profetas: sera llamado ...» (Mt 2,33)"
]
}
]
}
];