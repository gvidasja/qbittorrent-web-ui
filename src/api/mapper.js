const MAP = {
  SEARCH_RESULT: ({
    descrLink: descriptionLink,
    fileName: name,
    fileSize: size,
    fileUrl: magnetLink,
    nbLeechers: leechers,
    nbSeeders: seeders,
    siteUrl,
  }) => ({
    id: magnetLink,
    name,
    size,
    magnetLink,
    siteUrl,
    descriptionLink,
    seeders,
    leechers,
  }),
  TORRENT: ({
    hash: id,
    name,
    dlspeed: downloadSpeed,
    upspeed: uploadSpeed,
    progress,
    size,
    num_seeds: seeders,
    num_leechs: leechers,
    ratio,
  }) => ({
    id,
    name,
    downloadSpeed,
    uploadSpeed,
    progress,
    size,
    seeders,
    leechers,
    ratio,
  }),
}

export default MAP
