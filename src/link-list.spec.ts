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



