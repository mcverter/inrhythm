/**
 Linked Lists
 A
 linked list is a data structure that represents a sequence of nodes. In a singly linked list, each node
 points to the next node in the linked list. A doubly linked list gives each node pointers to both the next
 node and the previous node.
 The following diagram depicts a doubly linked list:
 1
 Unlike an array, a linked list does not provide constant time access to a particular "index" within the list.
 This means that if you'd like to find the Kth element in the list, you will need to iterate through K elements.
 The benefit of a linked list is that you can add and remove items from the beginning of the list in constant
 time. For specific applications, this can be useful.
 � Creating a Linked List
 The code below implements a very basic singly linked list.
 1 class Node {
Node next= null;
2
3
int data;
4
public Node(int d) {
5
data= d;
6
7 }
9
10 void appendToTail(int d) {
Node end= new Node(d);
Node n = this;
while (n.next != null) {
n = n.next;
8
11
12
13
14
}
15
16
17 }
n.next = end;
In this implementation, we don't have a Linked List data structure. We access the linked list through a
reference to the head Node of the linked list. When you implement the linked list this way, you need to be
a bit careful. What if multiple objects need a reference to the linked list, and then the head of the linked list
changes? Some objects might still be pointing to the old head.
92
Cracking the Coding Interview, 6th EditionChapter 2 I Linked Lists
We could, if we chose, implement a Linked List class that wraps the Node class. This would essentially
just have a single member variable: the head Node. This would largely resolve the earlier issue.
Remember that when you're discussing a linked list in an interview, you must understand whether it is a
singly linked list or a doubly linked list.
� Deleting a Node from a Singly Linked List
Deleting a node from a linked list is fairly straightforward. Given a node n, we find the previous node prev
and set prev. next equal to n. next. If the list is doubly linked, we must also update n. next to set
n. next. prev equal to n. prev. The important things to remember are (1) to check for the null pointer
and (2) to update the head or tail pointer as necessary.
Additionally, if you implement this code in C, C++ or another language that requires the developer to do
memory management, you should consider if the removed node should be deallocated.
1 Node deleteNode(Node head, int d) {
Node n = head;
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16 }
if (n.data == d) {
return head.next;
}
*
moved head*
while (n.next != null) {
if (n.next.data == d) {
n.next = n.next.next;
return head; /* head didn't change*
}
n = n.next;
}
return head;
� The "Runner"Technique
The "runner" (or second pointer) technique is used in many linked list problems. The runner technique
means that you iterate through the linked list with two pointers simultaneously, with one ahead of the
other. The "fast" node might be ahead by a fixed amount, or it might be hopping multiple nodes for each
one node that the "slow" node iterates through.
For example, suppose you had a linked list a 1 - >a 2 -> ••• ->an - >b 1 ->b 2 -> ••• ->bn and you wanted to
rearrange it into a 1 ->b 1 ->a 2 - >b 2 -> ••• - >an - >bn. You do not know the length of the linked list (but you
do know that the length is an even number).
You could have one pointer pl (the fast pointer) move every two elements for every one move that p2
makes. When pl hits the end of the linked list, p2 will be at the midpoint. Then, move pl back to the front
and begin "weaving" the elements. On each iteration, p2 selects an element and inserts it after pl.
� Recursive Problems
A number of linked list problems rely on recursion. If you're having trouble solving a linked list problem,
you should explore if a recursive approach will work. We won't go into depth on recursion here, since a later
chapter is devoted to it.
CrackingTheCodinglnterview.com J 6th Edition
93Chapter 2 I Linked Lists
However, you should remember that recursive algorithms take at least O ( n) space, where n is the depth
of the recursive call. All recursive algorithms can be implemented iteratively, although they may be much
more complex.
Interview Questions
2.1
R�mov� Dups! Write code to remove duplicates from an unsorted linked list.
FOLLOW UP
How would you solve this problem if a temporary buffer is not allowed?
Hints: #9, #40
................................................... pg208
2.2
Return Kth to Last: Implement an algorithm to find the kth to last element of a singly linked list.
Hints:#8, #25, #41, #67, #126
2.3
Delete Middle Node: Implement an algorithm to delete a node in the middle (i.e., any node but
the first and last node, not necessarily the exact middle) of a singly linked list, given only access to
that node.
EXAMPLE
lnput:the node c from the linked lista->b->c->d->e->f
Result: nothing is returned, but the new linked list looks like a->b->d->e- >f
Hints:#72
•-----"•·•m. �---··�
2.4
••··�·-''"•-�mm••·*'9
Partition: Write code to partition a linked list around a value x, such that all nodes less than x come
before all nodes greater than or equal to x. If x is contained within the list, the values of x only need
to be after the elements less than x (see below). The partition element x can appear anywhere in the
"right partition"; it does not need to appear between the left and right partitions.
EXAMPLE
Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1 [partition= 5]
Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
Hints: #3, #24
94
•••••••••••••••••••••
Cracking the Coding Interview, 6th EditionChapter 2 I Linked Lists
2.5
a linked list, where each node contains a single
digit. The digits are stored in reverse order, such that the 1 's digit is at the head of the list. Write a
function that adds the two numbers and returns the sum as a linked list.
Sum Lists: You have two numbers represented by
EXAMPLE
Input: (7-> 1 -> 6) + (5 -> 9 -> 2).That is,617 + 295.
Output: 2 -> 1 -> 9. That is, 912.
FOLLOW UP
Suppose the digits are stored in forward order. Repeat the above problem.
EXAMPLE
lnput:(6 -> 1 -> 7) + (2 -> 9 -> 5).That is,617 + 295.
Output: 9 -> 1 -> 2. That is, 912.
Hints: #7, #30, #71, #95, #109
2.6
Palindrome: Implement a function to check if a linked list is a palindrome.
Hints:#5, #13, #29, #61, #101
2.7
Intersection: Given two (singly) linked lists, determine if the two lists intersect. Return the inter­
secting node. Note that the intersection is defined based on reference, not value. That is, if the kth
node of the first linked list is the exact same node (by reference) as the jth node of the second
linked list, then they are intersecting.
Hints:#20, #45, #55, #65, #76, #93, #111, #120, #129
2.8
Loop Detection: Given a circular linked list, implement an algorithm that returns the node at the
beginning of the loop.
DEFINITION
Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so
as to make a loop in the linked list.
EXAMPLE
Input:
Output:
A -> B -> C -> D -> E -> C [the same C as earlier]
C
Hints: #50, #69, #83, #90
Additional Questions: Trees and Graphs (#4.3), Object-Oriented Design (#7.12), System Design and Scal­
ability (#9.5), Moderate Problems (#16.25), Hard Problems (#17.12).
Hints start on page 653.
CrackingTheCodinglnterview.com I 6th Edition
953
 */
