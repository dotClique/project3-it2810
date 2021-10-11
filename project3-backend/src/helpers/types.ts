import { APIResponse } from "../../../project3-common/src/types";

export type AsyncAPIRes<Data> = Promise<APIResponse<Data>>;
