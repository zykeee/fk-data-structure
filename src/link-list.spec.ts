import { LinkList, ListNode } from "./link-list"

describe("Create link list", () => {
	test("Create empty", () => {
		const ls = new LinkList([])
		expect(ls.head).toBeUndefined()
		expect(ls.tail).toBeUndefined()
		expect(ls.getNodes()).toHaveLength(0)
	})
	test("Create one node", () => {
		const ls = new LinkList([1])
		const nodes = ls.getNodes()

		const expectNode = new ListNode(1, undefined, undefined)
		expect(ls.head).toEqual(expectNode)
		expect(ls.tail).toEqual(expectNode)
		expect(nodes).toHaveLength(1)
		expect(nodes[0]).toEqual(expectNode)
	})
	test("Create multi nodes", () => {
		const ls = new LinkList([1, 2, 3])
		const nodes = ls.getNodes()

		expect(ls.head?.value).toEqual(1)
		expect(ls.tail?.value).toEqual(3)

		expect(nodes).toHaveLength(3)

		expect(nodes[0].value).toEqual(1)
		expect(nodes[0].pre).toEqual(undefined)
		expect(nodes[0].next?.value).toEqual(2)

		expect(nodes[1].value).toEqual(2)
		expect(nodes[1].pre?.value).toEqual(1)
		expect(nodes[1].next?.value).toEqual(3)

		expect(nodes[2].value).toEqual(3)
		expect(nodes[2].pre?.value).toEqual(2)
		expect(nodes[2].next?.value).toEqual(undefined)
	})
})

describe("Get length", () => {
	test("Get len of empty", () => {
		expect(new LinkList([])).toHaveLength(0)
	})
	test("Get len of one", () => {
		expect(new LinkList([1])).toHaveLength(1)
	})
	test("Get len of multi", () => {
		expect(new LinkList([1, 2, 3, 4, 5])).toHaveLength(5)
	})
})

describe("Get node ", () => {
	test("Get from empty", () => {
		const ls = new LinkList([])
		expect(ls.getNode(0)).toBeUndefined()
		expect(ls.getNode(0, "desc")).toBeUndefined()
	})
	test("Get from one", () => {
		const ls = new LinkList([1])
		expect(ls.getNode(0)?.value).toEqual(1)
		expect(ls.getNode(0, "desc")?.value).toEqual(1)
	})
	test("Get from multi", () => {
		const ls = new LinkList([1, 2, 3, 4, 5])
		expect(ls.getNode(3)?.value).toEqual(4)
		expect(ls.getNode(3, "desc")?.value).toEqual(2)
	})
	test("Get from multi out of range", () => {
		const ls = new LinkList([1, 2, 3, 4, 5])
		expect(ls.getNode(10)?.value).toBeUndefined()
		expect(ls.getNode(10, "desc")?.value).toBeUndefined()
	})
	test("Get from multi with invalid negative position", () => {
		const ls = new LinkList([1, 2, 3, 4, 5])
		expect(ls.getNode(-1)?.value).toBeUndefined()
		expect(ls.getNode(-1, "desc")?.value).toBeUndefined()
	})
})
