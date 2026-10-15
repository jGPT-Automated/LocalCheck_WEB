import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { isPublicCommunityCourt } from '../lib/public-court.ts';
const data=JSON.parse(readFileSync(new URL('../public/data/courts/basketball.json',import.meta.url),'utf8'));
test('export preserves every unique record with corrected usable coordinates',()=>{
 assert.equal(data.records.length,59705);
 assert.equal(new Set(data.records.map(r=>r.source_id)).size,59705);
 for(const r of data.records){assert.ok(Math.abs(r.latitude)<=90);assert.ok(Math.abs(r.longitude)<=180);assert.ok(r.locality);assert.ok(r.state);}
 const dorado=data.records.find(r=>r.locality==='Dorado'&&r.longitude===-66.2906);
 assert.equal(dorado.latitude,18.4428);
 assert.equal(data.metadata.verification_status,'source_location; not app/community verification');
});
test('public community selection excludes imported, archived, test and unreviewed courts',()=>{
 assert.equal(isPublicCommunityCourt({verification_status:'source_verified',is_confirmed:true}),false);
 assert.equal(isPublicCommunityCourt({added_by:'player',is_confirmed:true}),true);
 for(const flag of [{is_archived:true},{is_test:true},{deleted_at:'2026-01-01'},{is_confirmed:false},{visibility:'private'}]) assert.equal(isPublicCommunityCourt({added_by:'player',...flag}),false);
});
test('full download matches server records and state totals',()=>{
 const compact=JSON.parse(readFileSync(new URL('../data/court-resource/records.json',import.meta.url),'utf8'));
 assert.equal(compact.length,data.records.length);
 assert.equal(Object.values(data.metadata.states).reduce((a,b)=>a+b,0),59705);
 assert.deepEqual(compact[0],Object.values(data.records[0]));
});
