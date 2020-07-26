import { UrlQueryParamTypes, decode } from "react-url-query";
import LZString from "lz-string";

const mapUrlToProps = url => ({
  tiles: decode(
    UrlQueryParamTypes.json,
    LZString.decompressFromEncodedURIComponent(url.tiles)
  ),
  layout: decode(
    UrlQueryParamTypes.json,
    LZString.decompressFromEncodedURIComponent(url.layout)
  ),
  leagues: decode(
    UrlQueryParamTypes.json,
    LZString.compressToEncodedURIComponent(url.leagues)
  )
});

export default mapUrlToProps;
