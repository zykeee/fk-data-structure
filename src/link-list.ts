import { styleText } from "node:util"
import { consoleDivider } from "./utils/console"
import { Sequence } from "./utils/types"

export class ListNode<T> {
	constructor(
		public value: T,
		public pre?: ListNode<T>,
		public next?: ListNode<T>
	) {}
}

/**
 * When to use a LinkList?
 * This traits of LinkList are:
 * - Fast insert/remove with O(1)
 * - Slow finding by index with O(log n)
 */
export class LinkList<T> {
	public head?: ListNode<T>
	public tail?: ListNode<T>
	public length = 0

	/**
	 * Construct a linked list from a provided array,
	 * with the nodes arranged in the order of the elements in the array.
	 */
	private constructor() {}

	static fromArray<T>(array: T[]) {
		const linkList = new LinkList()
		let curr, pre
		for (let idx = 0; idx < array.length; idx++) {
			curr = new ListNode(array[idx])
			curr.pre = pre
			curr.next = array[idx + 1] ? new ListNode(array[idx + 1]) : undefined

			if (pre) pre.next = curr
			if (idx === 0) linkList.head = curr
			if (idx === array.length - 1) linkList.tail = curr

			pre = curr
			curr = curr.next
			linkList.length++
		}
		return linkList
	}

	/**
	 * Retrieve the nth node from the start.
	 */
	getNode(position: number, sequence: Sequence = "asc") {
		if (position < 0 || position > this.length) {
			return undefined
		}
		const isAsc = sequence === "asc"
		let curr = isAsc ? this.head : this.tail
		for (let i = 0; i < position; i++) {
			curr = isAsc ? curr?.next : curr?.pre
		}
		return curr
	}

	/**
	 * Retrieve all nodes from this linked list, noting that the nodes are not guaranteed to be sorted.
	 * @param fromTail Get nodes from the tail if it's enabled
	 */
	getNodes(fromTail: boolean = false) {
		const result = []
		if (fromTail) {
			let curr = this.tail
			while (curr) {
				result.push(curr)
				curr = curr.pre
			}
		} else {
			let curr = this.head
			while (curr) {
				result.push(curr)
				curr = curr.next
			}
		}

		return result
	}

	/**
	 * Visualization of all nodes.
	 */
	print() {
		console.log(styleText("bgGreen", " Head is: "), this.head)
		consoleDivider()
		console.log(styleText("bgGreen", " Tail is: "), this.tail)
		consoleDivider()
		console.log(styleText("bgGreen", " All nodes are: "), this.getNodes())
	}

	/**
	 * Get values of all nodes.
	 */
	values() {
		return this.getNodes().map((node) => node.value)
	}

	/**
	 * Swap the positions of two nodes at the specified indices.
	 */
	switchNodesByPosition(positionA: number, positionB: number) {
		const nodeA = this.getNode(positionA)
		const nodeB = this.getNode(positionB)
		if (nodeA === undefined) {
			throw new Error(`Found no node at position ${positionA}!`)
		}
		if (nodeB === undefined) {
			throw new Error(`Found no node at position ${positionB}!`)
		}
		const tmp = nodeA.value
		nodeA.value = nodeB.value
		nodeB.value = tmp
	}
}
