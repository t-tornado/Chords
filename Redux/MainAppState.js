export let playerState = {
    maxOpen: false,
    playerRunning: false,
    playerPlay: false,
    openPlayer: false,
    songsfetched: false,
    playerLoaded: false,
    artwork: "",
    webSongsLoaded: false,
    downloadedSongsLoaded: false,
    playerMode: "",
    openQueue: false,
    playerQueue: [],
    onlineLibrary: [],
    bottomNavBar: null,
    /// like song
    likeSongState: "",
    unlikeSongState: "",
    ///Hymns State
    hymns: [],
    loadingHymns: false,
    loadingHymnsError: false,
    hymnsFetched: false,
    /// Choral Blues
    choralBlues: [],
    loadingChoralBlues: false,
    loadingChoralBluesError: false,
    choralBluesFetched: false,
    /// Kelencha State
    kelencha: [],
    loadingKelencha: false,
    loadingKelenchaError: false,
    kelenchaFetched: false,
    //Anthems State
    anthems: [],
    loadingAnthems: false,
    loadingAnthemsError: false,
    anthemsFetched: false,
    ///Christmas Anthems
    christmasAnthems: [],
    loadingChristmasAnthems: false,
    loadingChristmasAnthemsError: false,
    christmasAnthemsFetched: false,
    ///Easter Anthems
    easterAnthems: [],
    loadingEasterAnthems: false,
    loadingEasterAnthemsError: false,
    easterAnthemsFetched: false,
    ///Classicals State
    classicals: [],
    loadingClassicals: false,
    loadingClassicalsError: false,
    classicalsFetched: false,
    searchKeyword: "",
    /// Download State
    downloadingSong: false,
    downloadingSuccess: false,
    downloadingError: false,
    downloads: [],
    downloadProgress: 0,
    /// Deleting Song State
    openCardOptions: false,
    deleteSong: false,
    songDeleted: false,
    fileToDelete: {
      id: 0,
      title: "",
      artist: "",
      genre: "",
      duration: "",
      composer: "",
      likes: 0,
      artwork: "",
    },
    playlist1: {
      name: "",
      data: [],
    },
  };