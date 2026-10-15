import { distanceKm, searchResource, RESOURCE_VERSION } from "@/lib/court-resource";
export async function GET(request: Request) {
 const p = new URL(request.url).searchParams;
 const lat = p.has("lat") ? Number(p.get("lat")) : null;
 const lon = p.has("lon") ? Number(p.get("lon")) : null;
 if ((lat!==null || lon!==null) && (lat===null || lon===null || !Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat)>90 || Math.abs(lon)>180)) return Response.json({error:"Supply both lat (-90 to 90) and lon (-180 to 180)."},{status:400});
 const requestedLimit=Number(p.get("limit")??50);
 const limit=Number.isFinite(requestedLimit)?Math.max(1,Math.min(100,Math.floor(requestedLimit))):50;
 const requestedOffset=Number(p.get("offset")??0);
 const offset=Number.isSafeInteger(requestedOffset)&&requestedOffset>=0?requestedOffset:0;
 let records = searchResource(p.get("state")??"",p.get("q")??"").map(r=>({source_id:r[0],locality:r[1],state:r[2],latitude:r[3],longitude:r[4],...(lat!==null&&lon!==null?{distance_km:Math.round(distanceKm(lat,lon,r)*100)/100}:{})}));
 if(lat!==null) records=records.sort((a,b)=>(a.distance_km??0)-(b.distance_km??0));
 return Response.json({version:RESOURCE_VERSION,sport:"basketball",verification_status:"source_location",total:records.length,offset,limit,next_offset:offset+limit<records.length?offset+limit:null,records:records.slice(offset,offset+limit),documentation:"https://localchecksports.com/court-directory#data",community:"https://localchecksports.com/courts"},{headers:{"Cache-Control":"public, max-age=3600","Access-Control-Allow-Origin":"*"}});
}
