import { LinkList, ListNode } from "./link-list"

/* -------------------------------------------------------------------------- */
/*                                    Basic                                   */
/* -------------------------------------------------------------------------- */
describe("Initialize LinkList", () => {
	test("Create empty", () => {
		const ls = LinkList.fromArray([])
		expect(ls.head).toBeUndefined()
		expect(ls.tail).toBeUndefined()
		expect(ls.getNodes()).toHaveLength(0)
	})
	test("Create one node", () => {
		const ls = LinkList.fromArray([1])
		const nodes = ls.getNodes()

		const expectNode = new ListNode(1, undefined, undefined)
		expect(ls.head).toEqual(expectNode)
		expect(ls.tail).toEqual(expectNode)
		expect(nodes).toHaveLength(1)
		expect(nodes[0]).toEqual(expectNode)
	})
	test("Create multi nodes", () => {
		const ls = LinkList.fromArray([1, 2, 3])
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
		expect(LinkList.fromArray([])).toHaveLength(0)
	})
	test("Get len of one", () => {
		expect(LinkList.fromArray([1])).toHaveLength(1)
	})
	test("Get len of multi", () => {
		expect(LinkList.fromArray([1, 2, 3, 4, 5])).toHaveLength(5)
	})
})

/* -------------------------------------------------------------------------- */
/*                                 Operations                                 */
/* -------------------------------------------------------------------------- */
describe("Operations Based on Position", () => {
	describe("Get node", () => {
		test("Get from empty", () => {
			const ls = LinkList.fromArray([])
			expect(ls.getNodeByPosition(0)).toBeUndefined()
			expect(ls.getNodeByPosition(0, "desc")).toBeUndefined()
		})
		test("Get from one", () => {
			const ls = LinkList.fromArray([1])
			expect(ls.getNodeByPosition(0)?.value).toEqual(1)
			expect(ls.getNodeByPosition(0, "desc")?.value).toEqual(1)
		})
		test("Get from multi", () => {
			const ls = LinkList.fromArray([1, 2, 3, 4, 5])
			expect(ls.getNodeByPosition(3)?.value).toEqual(4)
			expect(ls.getNodeByPosition(3, "desc")?.value).toEqual(2)
		})
		test("Get from multi out of range", () => {
			const ls = LinkList.fromArray([1, 2, 3, 4, 5])
			expect(ls.getNodeByPosition(10)?.value).toBeUndefined()
			expect(ls.getNodeByPosition(10, "desc")?.value).toBeUndefined()
		})
		test("Get from multi with invalid negative position", () => {
			const ls = LinkList.fromArray([1, 2, 3, 4, 5])
			expect(ls.getNodeByPosition(-1)?.value).toBeUndefined()
			expect(ls.getNodeByPosition(-1, "desc")?.value).toBeUndefined()
		})
	})
	describe("Switch node", () => {
		test("Switch head and tail", () => {
			const ls = LinkList.fromArray([1, 2, 3, 4])
			ls.switchNodesByPosition(0, 3)
			expect(ls.values()).toEqual([4, 2, 3, 1])
			expect(ls.head?.value).toEqual(4)
			expect(ls.tail?.value).toEqual(1)
		})
		test("Switch in middle", () => {
			const ls = LinkList.fromArray([1, 2, 3, 4, 5, 6])
			ls.switchNodesByPosition(2, 3)
			expect(ls.values()).toEqual([1, 2, 4, 3, 5, 6])
		})
		test("Switch out of range", () => {
			const ls = LinkList.fromArray([1, 2, 3, 4, 5, 6])
			expect(() => ls.switchNodesByPosition(2, 10)).toThrow()
			expect(() => ls.switchNodesByPosition(10, 2)).toThrow()
		})
	})
})

describe("Operations Based on Node", () => {
	describe("Delete node", () => {
		test("Delete head", () => {
			const ls = LinkList.fromArray([1, 2, 3])
			ls.deleteNode(ls.head)
			expect(ls.values()).toEqual([2, 3])
		})
		test("Delete tail", () => {
			const ls = LinkList.fromArray([1, 2, 3])
			ls.deleteNode(ls.tail)
			expect(ls.values()).toEqual([1, 2])
		})
		test("Delete node in mid", () => {
			const ls = LinkList.fromArray([1, 2, 3])
			ls.deleteNode(ls.head?.next)
			expect(ls.values()).toEqual([1, 3])
		})
		test("Delete multi in sequence", () => {
			const ls = LinkList.fromArray([1, 2, 3])
			ls.deleteNode(ls.head)
			ls.deleteNode(ls.head)
			expect(ls.values()).toEqual([3])
		})
		test("Delete multi in random order", () => {
			const ls = LinkList.fromArray([1, 2, 3, 4, 5])
			ls.deleteNode(ls.head)
			ls.deleteNode(ls.head?.next)
			expect(ls.values()).toEqual([2, 4, 5])
		})
		test("Delete till it's empty", () => {
			const ls = LinkList.fromArray([1, 2, 3])
			ls.deleteNode(ls.head)
			ls.deleteNode(ls.head)
			ls.deleteNode(ls.head)
			expect(ls.values()).toEqual([])
		})
	})

	describe("Append node at head", () => {
		test("Append to empty", () => {
			const ls = LinkList.fromArray<number>([])
			ls.appendAtHead(1)
			expect(ls.values()).toEqual([1])
		})
		test("Append to one", () => {
			const ls = LinkList.fromArray([2])
			ls.appendAtHead(1)
			expect(ls.values()).toEqual([1, 2])
		})
		test("Append to multi", () => {
			const ls = LinkList.fromArray([0, 2, 3])
			ls.appendAtHead(1)
			expect(ls.values()).toEqual([1, 0, 2, 3])
		})
	})

	describe("Append node at tail", () => {
		test("Append to empty", () => {
			const ls = LinkList.fromArray<number>([])
			ls.appendAtTail(1)
			expect(ls.values()).toEqual([1])
		})
		test("Append to one", () => {
			const ls = LinkList.fromArray([2])
			ls.appendAtTail(1)
			expect(ls.values()).toEqual([2, 1])
		})
		test("Append to multi", () => {
			const ls = LinkList.fromArray([0, 2, 3])
			ls.appendAtTail(1)
			expect(ls.values()).toEqual([0, 2, 3, 1])
		})
	})

	describe("Shift", () => {
		test("Shift from empty", () => {
			const ls = LinkList.fromArray([])
			expect(ls.shift()).toBeUndefined()
			expect(ls.values()).toEqual([])
		})
		test("Shift from one", () => {
			const ls = LinkList.fromArray([1])
			expect(ls.shift()).toEqual(1)
			expect(ls.values()).toEqual([])
		})
		test("Shift from multi", () => {
			const ls = LinkList.fromArray([1, 2, 3, 4])
			expect(ls.shift()).toEqual(1)
			expect(ls.values()).toEqual([2, 3, 4])
		})
	})
	describe("Pop", () => {
		test("Pop from empty", () => {
			const ls = LinkList.fromArray([])
			expect(ls.pop()).toBeUndefined()
			expect(ls.values()).toEqual([])
		})
		test("Pop from one", () => {
			const ls = LinkList.fromArray([1])
			expect(ls.pop()).toEqual(1)
			expect(ls.values()).toEqual([])
		})
		test("Pop from multi", () => {
			const ls = LinkList.fromArray([1, 2, 3, 4])
			expect(ls.pop()).toEqual(4)
			expect(ls.values()).toEqual([1, 2, 3])
		})
	})
})

describe("Collection API", () => {
	test("For each", () => {
		let loopCount = 0
		const checkArray: number[] = []

		LinkList.fromArray([1, 2, 3, 4, 5]).forEach((v, node) => {
			expect(v).toEqual(node.value)
			checkArray.push(v)
			loopCount++
		})
		expect(loopCount).toEqual(5)
		expect(checkArray).toEqual([1, 2, 3, 4, 5])
	})
})
