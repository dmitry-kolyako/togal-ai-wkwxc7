import {describe, expect, it} from "vitest";
import {createUrlFromRoute} from "../../../shared/utils/createUrlFromRoute.ts";
import {createUid} from "../../../shared/utils/createUid.ts";

describe('Utility tests', () => {
    const mockImageId = createUid()
    const mockEndpoint = "/image/:id/test"

    it('createUid: should create unique id', () => {
        const uid1 = createUid()
        const uid2 = createUid()

        expect(uid1).not.empty(mockImageId)
        expect(uid1).not.empty(uid1)
        expect(uid1).not.empty(uid2)

        expect(uid1).not.toEqual(mockImageId)
        expect(uid2).not.toEqual(mockImageId)
        expect(uid1).not.toEqual(uid2)

    })

    it('createUrlFromRoute: should replace placeholders in api routes', () => {
        const result = createUrlFromRoute(mockEndpoint, {id: mockImageId})

        expect(result).toEqual(`/image/${mockImageId}/test`)

    })
})