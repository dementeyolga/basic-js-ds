const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this.rootNode = null;
	}

	root() {
		return this.rootNode;
	}

	add(data) {
		if (!this.rootNode) {
			return (this.rootNode = new Node(data));
		} else {
			return addToEmpty(this.rootNode, data);
		}

		function addToEmpty(node, data) {
			if (data === node.data) {
				return node;
			}

			if (data < node.data) {
				if (!node.left) {
					console.log('add to left', node);
					return (node.left = new Node(data));
				} else {
					return addToEmpty(node.left, data);
				}
			}

			if (data > node.data) {
				if (!node.right) {
					console.log('add to right', node);
					return (node.right = new Node(data));
				} else {
					return addToEmpty(node.right, data);
				}
			}
		}
	}

	has(data) {
		if (!this.rootNode) {
			return false;
		} else {
			return findNode(this.rootNode, data);
		}

		function findNode(node, data) {
			if (data === node.data) {
				return true;
			}

			if (data < node.data) {
				if (!node.left) {
					return false;
				} else {
					return findNode(node.left, data);
				}
			}

			if (data > node.data) {
				if (!node.right) {
					return false;
				} else {
					return findNode(node.right, data);
				}
			}
		}
	}

	find(data) {
		if (!this.rootNode) {
			return null;
		} else {
			return findNode(this.rootNode, data);
		}

		function findNode(node, data) {
			if (data === node.data) {
				return node;
			}

			if (data < node.data) {
				if (!node.left) {
					return null;
				} else {
					return findNode(node.left, data);
				}
			}

			if (data > node.data) {
				if (!node.right) {
					return null;
				} else {
					return findNode(node.right, data);
				}
			}
		}
	}

	remove(data) {
		if (!this.rootNode) {
			return null;
		}

		if (!this.has(data)) {
			return null;
		}

		this.rootNode = removeNode(this.rootNode, data);
		return this.root;

		function removeNode(node, data) {
			if (data === node.data) {
				if (!node.left && !node.right) {
					console.log('dont have left and right', node);
					node = null;
					return node;
				} else if (!node.left) {
					node = node.right;
					return node;
				} else if (!node.right) {
					node = node.left;
					return node;
				} else {
					let minRightNode = node.right;

					while (minRightNode.left) {
						minRightNode = minRightNode.left;
					}

					node.data = minRightNode.data;
					node.right = removeNode(node.right, minRightNode.data);

					return node;
				}
			}

			if (data < node.data) {
				node.left = removeNode(node.left, data);

				return node;
			}

			if (data > node.data) {
				console.log('going right from node ', node);
				node.right = removeNode(node.right, data);

				return node;
			}
		}
	}

	min() {
		let current = this.rootNode;

		while (current.left) {
			current = current.left;
		}

		return current.data;
	}

	max() {
		let current = this.rootNode;

		while (current.right) {
			current = current.right;
		}

		return current.data;
	}
}

module.exports = {
	BinarySearchTree,
};
