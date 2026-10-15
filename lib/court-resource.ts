import rawRecords from "../data/court-resource/records.json";
export type ResourceRecord = [string, string, string, number, number];
export const resourceRecords = rawRecords as ResourceRecord[];
export const RESOURCE_VERSION = "2026-10-15";
export const PAGE_SIZE = 100;
export const stateNames: Record<string, string> = {
 AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",DC:"District of Columbia",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming",PR:"Puerto Rico",VI:"US Virgin Islands",GU:"Guam"
};
export const resourceStates = Object.entries(stateNames).map(([code,name])=>({code,name,count:resourceRecords.filter(r=>r[2]===code).length})).filter(s=>s.count).sort((a,b)=>a.name.localeCompare(b.name));
export function searchResource(state: string, query = "") {
 const q = query.trim().toLocaleLowerCase();
 return resourceRecords.filter(r=>(!state || r[2]===state.toUpperCase()) && (!q || `${r[1]} ${r[2]} ${stateNames[r[2]]} ${r[0]}`.toLocaleLowerCase().includes(q)));
}
export function parsePage(value: string | undefined, total: number) {
 const max = Math.max(1,Math.ceil(total/PAGE_SIZE));
 const n = Number(value ?? 1);
 return Number.isSafeInteger(n) && n>0 ? Math.min(n,max) : 1;
}
export function distanceKm(lat: number, lon: number, record: ResourceRecord) {
 const rad = Math.PI/180;
 const a = Math.sin((record[3]-lat)*rad/2)**2+Math.cos(lat*rad)*Math.cos(record[3]*rad)*Math.sin((record[4]-lon)*rad/2)**2;
 return 6371*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
