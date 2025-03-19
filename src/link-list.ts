class ListNode<T> {
	constructor(public value: T, public pre?: ListNode<T>, public next?: ListNode<T>) {}
}

export class LinkList<T> {
	nodes: ListNode<T>[] = []
	constructor(array: T[]) {
		for (let i = 0; i < array.length; i++) {
			const value = array[i]
			const preNode: ListNode<T> | undefined = this.nodes[i - 1]
			const thisNode = new ListNode(value, preNode, undefined)
			this.nodes.push(thisNode)
			if (preNode) {
				preNode.next = thisNode
			}
		}
	}

	getNodes() {
		return this.nodes
	}

	print() {
		console.log(this.nodes)
	}
}
