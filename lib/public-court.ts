/** Website detail pages belong to app community courts, never imported seeds. */
export function isPublicCommunityCourt(raw: Record<string, unknown>): boolean {
 if (raw.is_archived === true || raw.is_test === true || raw.deleted_at || raw.visibility === "private") return false;
 const contributor = raw.added_by ?? raw.created_by ?? raw.submitted_by;
 const confirmed = raw.is_confirmed ?? raw.is_verified ?? raw.verified;
 const status = raw.verification_status;
 if (confirmed === false || status === "rejected" || status === "needs_review") return false;
 return (typeof contributor === "string" && contributor.length > 0) || status === "community_verified" || status === "user_verified";
}
