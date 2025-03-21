import { styleText } from "node:util"
import { consoleDivider } from "./utils/console"
import { Sequence } from "./utils/types"

type HeadNode<T> = Required<ListNode<T>> & { pre: undefined }
type TailNode<T> = Required<ListNode<T>> & { next: undefined }
type MidNode<T> = Required<ListNode<T>>
export class ListNode<T> {
	constructor(
		public value: T,
		public pre?: ListNode<T>,
		public next?: ListNode<T>
	) {}

	appendPreNode(node: ListNode<T>) {
		this.pre = node
	}

	appendNextNode(node: ListNode<T>) {
		this.next = node
	}

	static isHead<T>(node: ListNode<T>): node is HeadNode<T> {
		return node.pre === undefined
	}

	static isTail<T>(node: ListNode<T>): node is TailNode<T> {
		return node.next === undefined
	}
	static isMid<T>(node: ListNode<T>): node is MidNode<T> {
		return node.next !== undefined && node.pre !== undefined
	}
}

/**
 * When to use a LinkList?
 * This traits of LinkList are:
 * - Fast insert/remove with O(1)
 * - Slow finding by index with O(log n)
 */
export class LinkList<T> {
	public head: ListNode<T> | undefined
	public tail: ListNode<T> | undefined
	public length = 0

	/* -------------------------------------------------------------------------- */
	/*                             Initialize LinkList                            */
	/* -------------------------------------------------------------------------- */
	/**
	 * Construct a linked list from a provided array,
	 * with the nodes arranged in the order of the elements in the array.
	 */
	private constructor() {}

	static fromArray<T>(array: T[]) {
		const linkList = new LinkList<T>()
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

	/* -------------------------------------------------------------------------- */
	/*                        Operations Based on Position                        */
	/* -------------------------------------------------------------------------- */
	/**
	 * Retrieve the nth node from the start.
	 */
	getNodeByPosition(position: number, sequence: Sequence = "asc") {
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
	 * Swap the positions of two nodes at the specified indices.
	 */
	switchNodesByPosition(positionA: number, positionB: number) {
		const nodeA = this.getNodeByPosition(positionA)
		const nodeB = this.getNodeByPosition(positionB)
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

	/* -------------------------------------------------------------------------- */
	/*                          Operations Based on Node                          */
	/* -------------------------------------------------------------------------- */
	deleteNode(node: ListNode<T> | undefined) {
		if (node) {
			if (node.pre) {
				node.pre.next = node.next
			} else {
				this.head = node.next
			}
			if (node.next) {
				node.next.pre = node.pre
			} else {
				this.tail = node.pre
			}
		}
	}

	/* -------------------------------------------------------------------------- */
	/*                            Visualization Related                           */
	/* -------------------------------------------------------------------------- */
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

	/* -------------------------------------------------------------------------- */
	/*                                 Collection API                             */
	/* -------------------------------------------------------------------------- */
	forEach(fn: (value: T, node: ListNode<T>) => void) {
		let curr = this.head
		while (curr) {
			fn(curr.value, curr)
			curr = curr.next
		}
	}

	filter(fn: (value: T, node: ListNode<T>) => boolean) {}

	map() {}
}
