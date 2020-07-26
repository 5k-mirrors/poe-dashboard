import { UrlQueryParamTypes, encode, replaceInUrlQuery } from "react-url-query";
import LZString from "lz-string";

const mapUrlChangeHandlersToProps = () => ({
  mapChangedTilesToUrl: tiles =>
    replaceInUrlQuery(
      "tiles",
      LZString.compressToEncodedURIComponent(
        encode(UrlQueryParamTypes.json, tiles)
      )
    ),
  mapChangedLayoutToUrl: layout =>
    replaceInUrlQuery(
      "layout",
      LZString.compressToEncodedURIComponent(
        encode(UrlQueryParamTypes.json, layout)
      )
    ),
  mapChangedLeaguesToUrl: leagues =>
    replaceInUrlQuery(
      "leagues",
      LZString.compressToEncodedURIComponent(
        encode(UrlQueryParamTypes.json, leagues)
      )
    )
});

export default mapUrlChangeHandlersToProps;
