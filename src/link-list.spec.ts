import { LinkList } from "./link-list"

describe("Create link list", () => {
	test("Create empty", () => {
		const ls = new LinkList([])
		expect(ls.getNodes().length).toEqual(0)
	})
	test("Create one node", () => {
		const ls = new LinkList([1])
		expect(ls.getNodes().length).toEqual(1)
		expect(ls.getNodes()[0].pre).toEqual(undefined)
		expect(ls.getNodes()[0].next).toEqual(undefined)
	})
	test("Create multi nodes", () => {
		const ls = new LinkList([1, 2, 3])
		expect(ls.getNodes().length).toEqual(3)

		expect(ls.getNodes()[0].value).toEqual(1)
		expect(ls.getNodes()[0].pre).toEqual(undefined)
		expect(ls.getNodes()[0].next?.value).toEqual(2)

		expect(ls.getNodes()[1].value).toEqual(2)
		expect(ls.getNodes()[1].pre?.value).toEqual(1)
		expect(ls.getNodes()[1].next?.value).toEqual(3)

		expect(ls.getNodes()[2].value).toEqual(3)
		expect(ls.getNodes()[2].pre?.value).toEqual(2)
		expect(ls.getNodes()[2].next?.value).toEqual(undefined)
	})
})
