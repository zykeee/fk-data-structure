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
	public head?: ListNode<T> = undefined
	public tail?: ListNode<T> = undefined
	public length = 0
	/**
	 * Construct a linked list from a provided array,
	 * with the nodes arranged in the order of the elements in the array.
	 */
	constructor(array: T[]) {
		let curr, pre
		for (let idx = 0; idx < array.length; idx++) {
			curr = new ListNode(array[idx])
			curr.pre = pre
			curr.next = array[idx + 1] ? new ListNode(array[idx + 1]) : undefined

			if (pre) pre.next = curr
			if (idx === 0) this.head = curr
			if (idx === array.length - 1) this.tail = curr

			pre = curr
			curr = curr.next
			this.length++
		}
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
	switchNodesByPosition(position1: number, position2: number) {
		const node1 = this.getNode(position1)
		const node2 = this.getNode(position2)
		if (node1 === undefined) {
			throw new Error(`Found no node at position1 ${position1}!`)
		}
		if (node2 === undefined) {
			throw new Error(`Found no node at position2 ${position2}!`)
		}
		const tmp = node1.value
		node1.value = node2.value
		node2.value = tmp
	}
}
