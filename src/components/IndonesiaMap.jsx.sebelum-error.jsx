import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, useMap, Tooltip } from "react-leaflet";
import L from "leaflet";
import indonesia from "../data/indonesia.json";
import { geojsonNameMap, provinces } from "../data";

const provinceData = Object.fromEntries(provinces.map((p) => [p.name, p]));

const colorFor = (members) => {
  if (!members) return "#E8E4DD";
  if (members < 3000) return "#FDE3E0";
  if (members < 7000) return "#F9B9B4";
  if (members < 12000) return "#F07A72";
  if (members < 20000) return "#E63B33";
  return "#C81B14";
};

const pusatIcon = L.divIcon({
  className: "",
  html: `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
    <div style="width:14px;height:14px;border-radius:999px;background:#E60000;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.35);"></div>
    <div style="background:#111;color:#fff;font:700 10px 'Plus Jakarta Sans',sans-serif;padding:3px 8px;border-radius:999px;white-space:nowrap;">PUSAT</div>
  </div>`,
  iconSize: [44, 34],
  iconAnchor: [22, 30],
});

function FitAll({ geojson }) {
  const map = useMap();
  useEffect(() => {
    if (!geojson) return;
    const layer = L.geoJSON(geojson);
    const bounds = layer.getBounds();
    map.fitBounds(bounds.pad(0.05));
  }, [geojson, map]);
  return null;
}

export default function IndonesiaMap({ onSelect, selectedName, height = 420, compact = false }) {
  const geoRef = useRef(null);

  const style = useMemo(() => {
    const fn = (feature) => {
      const name = geojsonNameMap[feature.properties?.Propinsi?.toUpperCase()];
      const data = name ? provinceData[name] : null;
      const active = name === selectedName;
      return {
        fillColor: active ? "#B80000" : colorFor(data?.members),
        weight: 1.1,
        opacity: 1,
        color: "#ffffff",
        fillOpacity: 0.92,
      };
    };
    return fn;
  }, [selectedName]);

  const onEachFeature = (feature, layer) => {
    const raw = feature.properties?.Propinsi;
    const name = geojsonNameMap[raw?.toUpperCase()] || raw;
    const data = provinceData[name];
    layer.bindTooltip(
      `<div style="display:flex;flex-direction:column;gap:2px;">
        <span style="font-size:13px;">${name}</span>
        <span style="font-size:11px;opacity:.7;">${data ? data.members.toLocaleString("id-ID") + " anggota · " + data.branches + " cabang" : "—"}</span>
      </div>`,
      { className: "ik-tip", direction: "top", offset: [0, -6] },
    );
    layer.on({
      mouseover: () => {
        layer.setStyle({ fillColor: "#F5C400", fillOpacity: 1 });
        layer.bringToFront();
      },
      mouseout: () => {
        if (geoRef.current) geoRef.current.resetStyle(layer);
      },
      click: () => {
        if (name && onSelect) onSelect(name);
      },
    });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/[0.06] shadow-card">
      <MapContainer
        center={[-2.4, 118]}
        zoom={4.6}
        zoomSnap={0.1}
        scrollWheelZoom={false}
        style={{ height: `${height}px` }}
        className="z-0"
        attributionControl={compact ? false : true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.webp"
        />
        <GeoJSON ref={geoRef} data={indonesia} style={style} onEachFeature={onEachFeature} />
        <Marker position={[-6.2, 106.845]} icon={pusatIcon}>
          <Tooltip className="ik-tip" direction="top" offset={[0, -12]}>
            Markas Pusat
          </Tooltip>
        </Marker>
        <FitAll geojson={indonesia} />
      </MapContainer>
      {/* Legend */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-[500] rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50">Jumlah Anggota</p>
        <div className="mt-2 flex items-center gap-2">
          {[
            ["#FDE3E0", "< 3rb"],
            ["#F07A72", "< 12rb"],
            ["#E63B33", "< 20rb"],
            ["#C81B14", "20rb+"],
          ].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c }} />
              <span className="text-[10px] font-semibold text-ink/55">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
