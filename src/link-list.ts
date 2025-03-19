import { consoleDivider } from "./utils/console"
import { styleText } from "node:util"

export class ListNode<T> {
	constructor(public value: T, public pre?: ListNode<T>, public next?: ListNode<T>) {}
}

export class LinkList<T> {
	public head?: ListNode<T> = undefined
	public tail?: ListNode<T> = undefined
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
		}
	}

	/**
	 * Retrieve all nodes from this linked list, noting that the nodes are not guaranteed to be sorted.
	 */
	getNodes(sequence: "asc" | "desc" = "asc") {
		const result = []
		if (sequence === "asc") {
			let curr = this.head
			while (curr) {
				result.push(curr)
				curr = curr.next
			}
		}
		if (sequence === "desc") {
			let curr = this.tail
			while (curr) {
				result.push(curr)
				curr = curr.pre
			}
		}
		return result
	}

	/**
	 * Visualization
	 */
	print() {
		console.log(styleText("bgGreen", " Head is: "), this.head)
		consoleDivider()
		console.log(styleText("bgGreen", " Tail is: "), this.tail)
		consoleDivider()
		console.log(styleText("bgGreen", " All nodes are: "), this.getNodes())
	}
}
