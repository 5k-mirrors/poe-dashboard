const tilesValue = [
  {
    selectedLeague: "Standard__gridProps",
    selectedItemType: "Currency",
    selectedItem: "Ancient Reliquary Key",
    id: "fs22"
  }
];

const tilesPosition = [
  {
    h: 1,
    i: "bl3axz__itemProps",
    moved: false,
    static: false,
    w: 1,
    x: 1,
    y: 0
  }
];

const returnedData = {
  tiles: tilesValue,
  layout: tilesPosition
};

const mapUrlToprops = jest.fn().mockReturnValue(returnedData);

export default mapUrlToprops;
