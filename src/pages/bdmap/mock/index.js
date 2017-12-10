import {mapUrls} from '../api'

const heatPoints = [
  {lng: 116.418261, lat: 39.921984, count: Math.round(Math.random() * 100)},
  {lng: 116.423332, lat: 39.916532, count: Math.round(Math.random() * 100)},
  {lng: 116.419787, lat: 39.930658, count: Math.round(Math.random() * 100)},
  {lng: 116.418455, lat: 39.920921, count: Math.round(Math.random() * 100)},
  {lng: 116.418843, lat: 39.915516, count: Math.round(Math.random() * 100)},
  {lng: 116.42546, lat: 39.918503, count: Math.round(Math.random() * 100)},
  {lng: 116.423289, lat: 39.919989, count: Math.round(Math.random() * 100)},
  {lng: 116.418162, lat: 39.915051, count: Math.round(Math.random() * 100)},
  {lng: 116.422039, lat: 39.91782, count: Math.round(Math.random() * 100)},
  {lng: 116.41387, lat: 39.917253, count: Math.round(Math.random() * 100)},
  {lng: 116.41773, lat: 39.919426, count: Math.round(Math.random() * 100)},
  {lng: 116.421107, lat: 39.916445, count: Math.round(Math.random() * 100)},
  {lng: 116.417521, lat: 39.917943, count: Math.round(Math.random() * 100)},
  {lng: 116.419812, lat: 39.920836, count: Math.round(Math.random() * 100)},
  {lng: 116.420682, lat: 39.91463, count: Math.round(Math.random() * 100)},
  {lng: 116.415424, lat: 39.924675, count: Math.round(Math.random() * 100)},
  {lng: 116.419242, lat: 39.914509, count: Math.round(Math.random() * 100)},
  {lng: 116.422766, lat: 39.921408, count: Math.round(Math.random() * 100)},
  {lng: 116.421674, lat: 39.924396, count: Math.round(Math.random() * 100)},
  {lng: 116.427268, lat: 39.92267, count: Math.round(Math.random() * 100)},
  {lng: 116.417721, lat: 39.920034, count: Math.round(Math.random() * 100)},
  {lng: 116.412456, lat: 39.92667, count: Math.round(Math.random() * 100)},
  {lng: 116.420432, lat: 39.919114, count: Math.round(Math.random() * 100)},
  {lng: 116.425013, lat: 39.921611, count: Math.round(Math.random() * 100)},
  {lng: 116.418733, lat: 39.931037, count: Math.round(Math.random() * 100)},
  {lng: 116.419336, lat: 39.931134, count: Math.round(Math.random() * 100)},
  {lng: 116.413557, lat: 39.923254, count: Math.round(Math.random() * 100)},
  {lng: 116.418367, lat: 39.92943, count: Math.round(Math.random() * 100)},
  {lng: 116.424312, lat: 39.919621, count: Math.round(Math.random() * 100)},
  {lng: 116.423874, lat: 39.919447, count: Math.round(Math.random() * 100)},
  {lng: 116.424225, lat: 39.923091, count: Math.round(Math.random() * 100)},
  {lng: 116.417801, lat: 39.921854, count: Math.round(Math.random() * 100)},
  {lng: 116.417129, lat: 39.928227, count: Math.round(Math.random() * 100)},
  {lng: 116.426426, lat: 39.922286, count: Math.round(Math.random() * 100)},
  {lng: 116.421597, lat: 39.91948, count: Math.round(Math.random() * 100)},
  {lng: 116.423895, lat: 39.920787, count: Math.round(Math.random() * 100)},
  {lng: 116.423563, lat: 39.921197, count: Math.round(Math.random() * 100)},
  {lng: 116.417982, lat: 39.922547, count: Math.round(Math.random() * 100)},
  {lng: 116.426126, lat: 39.921938, count: Math.round(Math.random() * 100)},
  {lng: 116.42326, lat: 39.915782, count: Math.round(Math.random() * 100)},
  {lng: 116.419239, lat: 39.916759, count: Math.round(Math.random() * 100)},
  {lng: 116.417185, lat: 39.929123, count: Math.round(Math.random() * 100)},
  {lng: 116.417237, lat: 39.927518, count: Math.round(Math.random() * 100)},
  {lng: 116.417784, lat: 39.915754, count: Math.round(Math.random() * 100)},
  {lng: 116.420193, lat: 39.917061, count: Math.round(Math.random() * 100)},
  {lng: 116.422735, lat: 39.915619, count: Math.round(Math.random() * 100)},
  {lng: 116.418495, lat: 39.915958, count: Math.round(Math.random() * 100)},
  {lng: 116.416292, lat: 39.931166, count: Math.round(Math.random() * 100)},
  {lng: 116.419916, lat: 39.924055, count: Math.round(Math.random() * 100)},
  {lng: 116.42189, lat: 39.921308, count: Math.round(Math.random() * 100)},
  {lng: 116.413765, lat: 39.929376, count: Math.round(Math.random() * 100)},
  {lng: 116.418232, lat: 39.920348, count: Math.round(Math.random() * 100)},
  {lng: 116.417554, lat: 39.930511, count: Math.round(Math.random() * 100)},
  {lng: 116.418568, lat: 39.918161, count: Math.round(Math.random() * 100)},
  {lng: 116.413461, lat: 39.926306, count: Math.round(Math.random() * 100)},
  {lng: 116.42232, lat: 39.92161, count: Math.round(Math.random() * 100)},
  {lng: 116.4174, lat: 39.928616, count: Math.round(Math.random() * 100)},
  {lng: 116.424679, lat: 39.915499, count: Math.round(Math.random() * 100)},
  {lng: 116.42171, lat: 39.915738, count: Math.round(Math.random() * 100)},
  {lng: 116.417836, lat: 39.916998, count: Math.round(Math.random() * 100)},
  {lng: 116.420755, lat: 39.928001, count: Math.round(Math.random() * 100)},
  {lng: 116.414077, lat: 39.930655, count: Math.round(Math.random() * 100)},
  {lng: 116.426092, lat: 39.922995, count: Math.round(Math.random() * 100)},
  {lng: 116.41535, lat: 39.931054, count: Math.round(Math.random() * 100)},
  {lng: 116.413022, lat: 39.921895, count: Math.round(Math.random() * 100)},
  {lng: 116.415551, lat: 39.913373, count: Math.round(Math.random() * 100)},
  {lng: 116.421191, lat: 39.926572, count: Math.round(Math.random() * 100)},
  {lng: 116.419612, lat: 39.917119, count: Math.round(Math.random() * 100)},
  {lng: 116.418237, lat: 39.921337, count: Math.round(Math.random() * 100)},
  {lng: 116.423776, lat: 39.921919, count: Math.round(Math.random() * 100)},
  {lng: 116.417694, lat: 39.92536, count: Math.round(Math.random() * 100)},
  {lng: 116.415377, lat: 39.914137, count: Math.round(Math.random() * 100)},
  {lng: 116.417434, lat: 39.914394, count: Math.round(Math.random() * 100)},
  {lng: 116.42588, lat: 39.922622, count: Math.round(Math.random() * 100)},
  {lng: 116.418345, lat: 39.919467, count: Math.round(Math.random() * 100)},
  {lng: 116.426883, lat: 39.917171, count: Math.round(Math.random() * 100)},
  {lng: 116.423877, lat: 39.916659, count: Math.round(Math.random() * 100)},
  {lng: 116.415712, lat: 39.915613, count: Math.round(Math.random() * 100)},
  {lng: 116.419869, lat: 39.931416, count: Math.round(Math.random() * 100)},
  {lng: 116.416956, lat: 39.925377, count: Math.round(Math.random() * 100)},
  {lng: 116.42066, lat: 39.925017, count: Math.round(Math.random() * 100)},
  {lng: 116.416244, lat: 39.920215, count: Math.round(Math.random() * 100)},
  {lng: 116.41929, lat: 39.915908, count: Math.round(Math.random() * 100)},
  {lng: 116.422116, lat: 39.919658, count: Math.round(Math.random() * 100)},
  {lng: 116.4183, lat: 39.925015, count: Math.round(Math.random() * 100)},
  {lng: 116.421969, lat: 39.913527, count: Math.round(Math.random() * 100)},
  {lng: 116.422936, lat: 39.921854, count: Math.round(Math.random() * 100)},
  {lng: 116.41905, lat: 39.929217, count: Math.round(Math.random() * 100)},
  {lng: 116.424579, lat: 39.914987, count: Math.round(Math.random() * 100)},
  {lng: 116.42076, lat: 39.915251, count: Math.round(Math.random() * 100)},
  {lng: 116.425867, lat: 39.918989, count: Math.round(Math.random() * 100)}
]

const polygon = [
  {
    id: 345,
    range: [
      {
        lng: 116.453460847,
        lat: 39.8378190816
      },
      {
        lng: 116.472673756,
        lat: 39.8390887475
      },
      {
        lng: 116.49205276,
        lat: 39.854470512
      },
      {
        lng: 116.495850319,
        lat: 39.8776670502
      },
      {
        lng: 116.555487091,
        lat: 39.8750771493
      },
      {
        lng: 116.556750589,
        lat: 39.8564351803
      },
      {
        lng: 116.533156545,
        lat: 39.838964538
      },
      {
        lng: 116.519133768,
        lat: 39.8281776434
      },
      {
        lng: 116.512525868,
        lat: 39.8247657192
      },
      {
        lng: 116.483210454,
        lat: 39.8112289691
      }
    ],
    name: '大武基',
    center: {lng: 116.5074302, lat: 39.8443694591},
    count: Math.round(1000 * Math.random())
  },
  {
    id: 346,
    range: [
      {
        lng: 116.385004257,
        lat: 39.9939422084
      },
      {
        lng: 116.38806527,
        lat: 39.9830774016
      },
      {
        lng: 116.387435138,
        lat: 39.9743511
      },
      {
        lng: 116.414378563,
        lat: 39.97542406
      },
      {
        lng: 116.414203609,
        lat: 39.9947786208
      }
    ],
    name: '北土城',
    center: {lng: 116.397817367, lat: 39.9843146782},
    count: Math.round(1000 * Math.random())
  }
]

export default {
  /**
   * mock bootstrap
   */
  bootstrap (mock) {
    mock.onGet(mapUrls.heat).reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, { code: 0, msg: '', result: heatPoints }])
      })
    })

    mock.onGet(mapUrls.polygon).reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, { code: 0, msg: '', result: polygon }])
      })
    })

    mock.onGet(mapUrls.pgHeat).reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, { code: 0, msg: '', result: polygon }])
      })
    })
  }
}
