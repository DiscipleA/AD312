import React, { useEffect, useMemo, useRef, useState } from 'react'
import '../styles/stateMasterclass.css'
import EditableCodeRunner from '../components/interactive-code/EditableCodeRunner'
import { annotateDisplayedCode } from '../utils/educationalCode'

const pageStyles = {
  fontFamily: "Arial, sans-serif",
  background: "#f4f6f8",
  color: "#1f2d3d",
  padding: "32px",
  lineHeight: 1.6,
};

const slideStyles = {
  background: "#ffffff",
  borderRadius: "18px",
  padding: "32px",
  marginBottom: "40px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const titleStyles = {
  fontSize: "34px",
  fontWeight: 800,
  borderLeft: "8px solid #3498db",
  paddingLeft: "18px",
  marginBottom: "22px",
  color: "#2c3e50",
};

const boxStyles = {
  background: "#f8fbfd",
  border: "1px solid #d9e6ef",
  borderRadius: "14px",
  padding: "20px",
};

const sectionTitleStyles = {
  fontSize: "22px",
  fontWeight: 700,
  color: "#2c3e50",
  marginBottom: "12px",
};

const codeStyles = {
  background: "#1e272e",
  color: "#f5f6fa",
  padding: "20px",
  borderRadius: "14px",
  overflowX: "auto",
  whiteSpace: "pre-wrap",
  fontSize: "14px",
};

const actionStyles = {
  padding: "22px",
  border: "3px solid #3498db",
  borderRadius: "16px",
  background: "#ffffff",
};

const buttonStyles = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "10px",
  background: "#3498db",
  color: "#ffffff",
  fontWeight: 700,
  cursor: "pointer",
  marginRight: "8px",
  marginBottom: "8px",
};

const nodeStyles = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "74px",
  minHeight: "48px",
  border: "2px solid #3498db",
  borderRadius: "12px",
  background: "#ecf6fd",
  fontWeight: 700,
  margin: "8px",
};

const arrowStyles = {
  fontSize: "24px",
  fontWeight: 800,
  color: "#2c3e50",
};

const SlideHeader = ({ title, bulletPoints }) => {
  return (
    <div
      style={{
        background: "#2c3e50",
        color: "#ffffff",
        padding: "22px",
        borderRadius: "16px",
        marginBottom: "24px",
      }}
    >
      <h2 style={{ margin: "0 0 12px 0", fontSize: "26px" }}>{title}</h2>
      <ul style={{ margin: 0, paddingLeft: "22px" }}>
        {bulletPoints.map((point, index) => (
          <li key={index} style={{ marginBottom: "6px" }}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

function addLinkedListTeachingComments(code) {
  if (code.includes('LINKED LIST TEACHING NOTE')) return code

  return code
    .replace(
      "class DemoNode {\n  constructor(data, id, next = null) {",
      `// LINKED LIST TEACHING NOTE:\n// A linked list is made from node objects, not array indexes.\n// Each node carries two responsibilities:\n// 1. data: the value students can see in the UI.\n// 2. next: the reference that connects this node to the next node in the chain.\n// The optional next = null default is important because the final node in a\n// singly linked list must point to nothing. That null value is how traversal\n// knows it has reached the end of the list.\nclass DemoNode {\n  constructor(data, id, next = null) {`,
    )
    .replace(
      "    this.data = data;\n    this.id = id;\n    this.next = next;",
      `    // data is the payload stored inside the node. In a real app, this\n    // could be a number, a task object, a playlist item, or any record.\n    this.data = data;\n\n    // id is not required by linked-list theory, but React needs stable keys\n    // when rendering arrays of visual nodes. We keep it separate from data so\n    // the display value can change without confusing React's reconciliation.\n    this.id = id;\n\n    // next is the pointer/reference that creates the chain. This is the most\n    // important linked-list field: changing next rewires the structure.\n    this.next = next;`,
    )
    .replace(
      "const linkedListToArray = (head) => {\n  const values = [];",
      `// LINKED LIST TEACHING NOTE:\n// React renders lists most easily from arrays, but a linked list is not an\n// array internally. This helper walks the chain from head to null and collects\n// each node into an array only for display. The linked-list structure remains\n// pointer-based; the array is just a rendering bridge.\nconst linkedListToArray = (head) => {\n  const values = [];`,
    )
    .replace(
      "  let current = head;\n  while (current !== null) {",
      `  // current acts like a movable finger. It starts at the head and then\n  // advances one node at a time by following current.next.\n  let current = head;\n\n  // This loop is the reason linked-list traversal is O(n): to reach a later\n  // node, we must visit each previous node in order. There is no direct index\n  // jump like array[5].\n  while (current !== null) {`,
    )
    .replace(
      "    values.push(current);\n    current = current.next;",
      `    // Store the current node for the UI before moving forward.\n    values.push(current);\n\n    // Move to the next node by following the pointer/reference. If next is\n    // null, the loop ends because the chain has no more nodes.\n    current = current.next;`,
    )
    .replace(
      "const cloneList = (head) => {\n  if (!head) return null;",
      `// LINKED LIST TEACHING NOTE:\n// This clone helper protects React state immutability. A linked list is made\n// from nested objects, so directly changing current.next on the existing state\n// would mutate the old structure. Instead, we copy the chain, make pointer\n// changes on the copy, and return a new head reference for React to render.\nconst cloneList = (head) => {\n  // Empty list edge case: if there is no head, there is no chain to copy.\n  if (!head) return null;`,
    )
    .replace(
      "  const newHead = new DemoNode(head.data, head.id);\n  let sourceCurrent = head.next;\n  let cloneCurrent = newHead;",
      `  // Copy the head first because every operation must preserve the entry\n  // point. Losing the head means losing access to the entire list.\n  const newHead = new DemoNode(head.data, head.id);\n\n  // sourceCurrent walks through the original list; cloneCurrent trails through\n  // the new copied list so each copied node can be linked to the next copy.\n  let sourceCurrent = head.next;\n  let cloneCurrent = newHead;`,
    )
    .replace(
      "  while (sourceCurrent) {\n    cloneCurrent.next = new DemoNode(sourceCurrent.data, sourceCurrent.id);",
      `  // Copy the rest of the chain one node at a time. Each new node receives\n  // the same data/id, but the next references are brand-new objects.\n  while (sourceCurrent) {\n    cloneCurrent.next = new DemoNode(sourceCurrent.data, sourceCurrent.id);`,
    )
    .replace(
      "    cloneCurrent = cloneCurrent.next;\n    sourceCurrent = sourceCurrent.next;",
      `    // Advance both walkers: one through the copied chain and one through\n    // the original chain. This keeps the two structures aligned.\n    cloneCurrent = cloneCurrent.next;\n    sourceCurrent = sourceCurrent.next;`,
    )
    .replace(
      "const NodeChain = ({ head }) => {\n  const nodes = linkedListToArray(head);",
      `// LINKED LIST TEACHING NOTE:\n// NodeChain is the visualizer. It does not change the list; it converts the\n// pointer chain into boxes and arrows so students can see how each next\n// reference connects one node to another.\nconst NodeChain = ({ head }) => {\n  const nodes = linkedListToArray(head);`,
    )
    .replace(
      "      {nodes.map((node, index) => (",
      `      {/* Each rendered box represents one node. The arrow after it represents\n          the node.next reference. The final \"→ null\" shows where the list stops. */}\n      {nodes.map((node, index) => (`,
    )
    .replace(
      "  const idRef = useRef(2);",
      `  // idRef stores the next unique id without causing a re-render. This is\n  // useful because ids are bookkeeping for React keys, not visual state.\n  const idRef = useRef(2);`,
    )
    .replace(
      "  const idRef = useRef(3);",
      `  // idRef keeps track of the next unique node id. It survives renders but\n  // does not trigger a render when changed, which is ideal for id counters.\n  const idRef = useRef(3);`,
    )
    .replace(
      "  const [head, setHead] = useState(() => new DemoNode(1, 1));",
      `  // head is the entry point to the entire linked list. Every traversal,\n  // insertion, and deletion starts here. If head becomes null, the list is empty.\n  const [head, setHead] = useState(() => new DemoNode(1, 1));`,
    )
    .replace(
      "  const addNode = () => {\n    setHead((currentHead) => {",
      `  const addNode = () => {\n    // Functional state update gives us the latest head value, even if several\n    // updates happen quickly. That matters for pointer-based structures because\n    // every change depends on the current chain.\n    setHead((currentHead) => {`,
    )
    .replace(
      "      const copiedHead = cloneList(currentHead);\n      let current = copiedHead;",
      `      // Work on a copied list so the previous React state is not mutated.\n      const copiedHead = cloneList(currentHead);\n\n      // Start at the copied head and walk until we find the tail.\n      let current = copiedHead;`,
    )
    .replace(
      "      while (current.next !== null) {\n        current = current.next;\n      }",
      `      // Tail search: the tail is the node whose next pointer is null.\n      while (current.next !== null) {\n        current = current.next;\n      }`,
    )
    .replace(
      "      idRef.current += 1;\n      current.next = new DemoNode(idRef.current, idRef.current);",
      `      // Create a new tail node and attach it by changing only the old tail's\n      // next reference. This is the core append operation.\n      idRef.current += 1;\n      current.next = new DemoNode(idRef.current, idRef.current);`,
    )
    .replace(
      "const NodeStructureDemo = () => {\n  const firstNode = new DemoNode(\"Start\", 1);\n  const secondNode = new DemoNode(\"Middle\", 2);\n  firstNode.next = secondNode;",
      `const NodeStructureDemo = () => {\n  // Create two separate nodes first. At this moment they are independent\n  // objects; no linked list exists until one node points to another.\n  const firstNode = new DemoNode(\"Start\", 1);\n  const secondNode = new DemoNode(\"Middle\", 2);\n\n  // This single assignment creates the link: Start → Middle.\n  // The first node now knows where the next node lives.\n  firstNode.next = secondNode;`,
    )
    .replace(
      "  const [head, setHead] = useState(() => {\n    const first = new DemoNode(\"Head\", 1);",
      `  const [head, setHead] = useState(() => {\n    // Build an initial two-node chain so students can immediately see that\n    // the head is not the whole list; it is the first reference into the list.\n    const first = new DemoNode(\"Head\", 1);`,
    )
    .replace(
      "  const appendNode = () => {\n    setHead((currentHead) => {",
      `  const appendNode = () => {\n    // Appending must keep the head stable while changing the tail's next\n    // pointer. The list grows at the end, but the entry point remains head.\n    setHead((currentHead) => {`,
    )
    .replace(
      "  const [visited, setVisited] = useState([]);",
      `  // visited stores the traversal order. It is separate from the linked list\n  // itself so the demo can show the path without modifying the chain.\n  const [visited, setVisited] = useState([]);`,
    )
    .replace(
      "  const traverse = () => {\n    const elements = [];",
      `  const traverse = () => {\n    // Traversal reads the list from left to right. It does not insert, delete,\n    // or rewire anything; it only follows next references and records values.\n    const elements = [];`,
    )
    .replace(
      "  const insertAfterSecond = () => {\n    setHead((currentHead) => {",
      `  const insertAfterSecond = () => {\n    // Insertion in a linked list is pointer rewiring. We do not shift every\n    // item like an array; we connect the new node between two existing nodes.\n    setHead((currentHead) => {`,
    )
    .replace(
      "      let secondNode = copiedHead.next;\n      if (secondNode && secondNode.next && secondNode.next.data !== 9) {",
      `      // The target location is after the second node. We first locate that\n      // node, then protect edge cases so we do not read next from null.\n      let secondNode = copiedHead.next;\n      if (secondNode && secondNode.next && secondNode.next.data !== 9) {`,
    )
    .replace(
      "        const newNode = new DemoNode(9, 9);\n        newNode.next = secondNode.next;\n        secondNode.next = newNode;",
      `        const newNode = new DemoNode(9, 9);\n\n        // Order matters: first point the new node at the original next node,\n        // then point the second node at the new node. Reversing this order can\n        // disconnect the rest of the chain.\n        newNode.next = secondNode.next;\n        secondNode.next = newNode;`,
    )
    .replace(
      "  const prepend = () => {\n    idRef.current += 1;\n    const newNode = new DemoNode(\"New Head\", idRef.current);\n    newNode.next = head;\n    setHead(newNode);\n  };",
      `  const prepend = () => {\n    idRef.current += 1;\n    const newNode = new DemoNode(\"New Head\", idRef.current);\n\n    // Prepending is the fastest linked-list insertion because we do not need\n    // traversal. The new node points to the old head, then becomes the head.\n    newNode.next = head;\n    setHead(newNode);\n  };`,
    )
    .replace(
      "  const deleteB = () => {\n    setHead((currentHead) => {",
      `  const deleteB = () => {\n    // Deleting a non-head node means finding the node before it, then changing\n    // that previous node's next pointer to skip over the target.\n    setHead((currentHead) => {`,
    )
    .replace(
      "      while (current && current.next) {\n        if (current.next.data === \"B\") {\n          current.next = current.next.next;",
      `      // We look one node ahead because deletion needs access to the previous\n      // node. If current.next is B, current is the predecessor we must rewire.\n      while (current && current.next) {\n        if (current.next.data === \"B\") {\n          // B is removed by bypassing it. After this assignment, B is no longer\n          // reachable from head, so the visible chain becomes A → C → null.\n          current.next = current.next.next;`,
    )
    .replace(
      "  const removeFirst = () => {\n    if (head) setHead(head.next);\n  };",
      `  const removeFirst = () => {\n    // Removing the head is a special O(1) case. No traversal is required.\n    // We simply move the head reference to the second node.\n    if (head) setHead(head.next);\n  };`,
    )
}

function prepareEditableLinkedListDemoCode(code) {
  return addLinkedListTeachingComments(code)
    .replace(/<button(?![^>]*className=)/g, '<button className="sm-button"')
}

const SectionWrapper = ({
  title,
  concept,
  slideData,
  description,
  realWorldApplication,
  broadScaleUsage,
  narrowedApproach,
  codeExample,
  entryComponentName,
  simpleTermsExplanation,
}) => {
  const editableCode = annotateDisplayedCode(
    prepareEditableLinkedListDemoCode(codeExample),
    'react',
  )

  return (
    <section className="sm-section">
      <h1 className="sm-title">{title}</h1>

      <SlideHeader title={concept} bulletPoints={slideData} />

      <p className="sm-description">
        <strong>Description:</strong> {description}
      </p>

      <div className="sm-grid">
        <div className="sm-panel">
          <h3>Real-World Application</h3>
          <p className="sm-preline">{realWorldApplication}</p>
        </div>

        <div className="sm-panel">
          <h3>Broad Scale Usage</h3>
          <p className="sm-preline">{broadScaleUsage}</p>
        </div>
      </div>

      <div className="sm-narrow">
        <h3>Narrowed Approach</h3>
        <p className="sm-preline">{narrowedApproach}</p>
      </div>

      <EditableCodeRunner
        title={`Singly Linked List: ${title}`}
        initialCode={editableCode}
        entryComponentName={entryComponentName}
        previewLabel="Code in Action"
      />

      <div className="sm-explanation">
        <h3>Simple Terms Explanation</h3>
        <p className="sm-preline">{simpleTermsExplanation}</p>
      </div>
    </section>
  );
};

class DemoNode {
  constructor(data, id, next = null) {
    this.data = data;
    this.id = id;
    this.next = next;
  }
}

const linkedListToArray = (head) => {
  const values = [];
  let current = head;
  while (current !== null) {
    values.push(current);
    current = current.next;
  }
  return values;
};

const cloneList = (head) => {
  if (!head) return null;
  const newHead = new DemoNode(head.data, head.id);
  let sourceCurrent = head.next;
  let cloneCurrent = newHead;

  while (sourceCurrent) {
    cloneCurrent.next = new DemoNode(sourceCurrent.data, sourceCurrent.id);
    cloneCurrent = cloneCurrent.next;
    sourceCurrent = sourceCurrent.next;
  }

  return newHead;
};

const NodeChain = ({ head }) => {
  const nodes = linkedListToArray(head);

  if (nodes.length === 0) {
    return <div style={{ color: "#7f8c8d", fontWeight: 700 }}>Empty list</div>;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      {nodes.map((node, index) => (
        <React.Fragment key={node.id}>
          <div style={nodeStyles}>{node.data}</div>
          {index < nodes.length - 1 && <span style={arrowStyles}>→</span>}
        </React.Fragment>
      ))}
      <span style={{ ...arrowStyles, color: "#95a5a6" }}>→ null</span>
    </div>
  );
};

const SinglyLinkedListDemo = () => {
  const idRef = useRef(2);
  const [head, setHead] = useState(() => new DemoNode(1, 1));

  const addNode = () => {
    setHead((currentHead) => {
      const copiedHead = cloneList(currentHead);
      let current = copiedHead;
      while (current.next !== null) {
        current = current.next;
      }
      idRef.current += 1;
      current.next = new DemoNode(idRef.current, idRef.current);
      return copiedHead;
    });
  };

  return (
    <div>
      <button style={buttonStyles} onClick={addNode}>
        Add Node
      </button>
      <NodeChain head={head} />
    </div>
  );
};

const NodeStructureDemo = () => {
  const firstNode = new DemoNode("Start", 1);
  const secondNode = new DemoNode("Middle", 2);
  firstNode.next = secondNode;

  return (
    <div>
      <div style={nodeStyles}>{firstNode.data}</div>
      <span style={arrowStyles}>→</span>
      <div style={nodeStyles}>{firstNode.next ? firstNode.next.data : "Nothing"}</div>
      <div style={{ marginTop: "16px", fontWeight: 700 }}>
        Current Node Data: {firstNode.data}
        <br />
        Points to: {firstNode.next ? firstNode.next.data : "Nothing"}
      </div>
    </div>
  );
};

const HeadNodeDemo = () => {
  const idRef = useRef(3);
  const [head, setHead] = useState(() => {
    const first = new DemoNode("Head", 1);
    first.next = new DemoNode("Second", 2);
    return first;
  });

  const appendNode = () => {
    setHead((currentHead) => {
      const copiedHead = cloneList(currentHead);
      let current = copiedHead;
      while (current.next) {
        current = current.next;
      }
      idRef.current += 1;
      current.next = new DemoNode(`Node ${idRef.current}`, idRef.current);
      return copiedHead;
    });
  };

  return (
    <div>
      <button style={buttonStyles} onClick={appendNode}>
        Append Node
      </button>
      <div style={{ marginBottom: "10px", fontWeight: 700 }}>Head points to the first node.</div>
      <NodeChain head={head} />
    </div>
  );
};

const TraversalDemo = () => {
  const [visited, setVisited] = useState([]);
  const [head] = useState(() => {
    const n1 = new DemoNode("Node A", 1);
    const n2 = new DemoNode("Node B", 2);
    const n3 = new DemoNode("Node C", 3);
    n1.next = n2;
    n2.next = n3;
    return n1;
  });

  const traverse = () => {
    const elements = [];
    let current = head;
    while (current !== null) {
      elements.push(current.data);
      current = current.next;
    }
    setVisited(elements);
  };

  return (
    <div>
      <button style={buttonStyles} onClick={traverse}>
        Traverse List
      </button>
      <NodeChain head={head} />
      <div style={{ marginTop: "16px", fontWeight: 700 }}>
        Visited: {visited.length ? visited.join(" → ") : "Not traversed yet"}
      </div>
    </div>
  );
};

const InsertionDemoLive = () => {
  const [head, setHead] = useState(() => {
    const n1 = new DemoNode(1, 1);
    const n2 = new DemoNode(2, 2);
    const n3 = new DemoNode(3, 3);
    n1.next = n2;
    n2.next = n3;
    return n1;
  });

  const insertAfterSecond = () => {
    setHead((currentHead) => {
      const copiedHead = cloneList(currentHead);
      let secondNode = copiedHead.next;
      if (secondNode && secondNode.next && secondNode.next.data !== 9) {
        const newNode = new DemoNode(9, 9);
        newNode.next = secondNode.next;
        secondNode.next = newNode;
      }
      return copiedHead;
    });
  };

  return (
    <div>
      <button style={buttonStyles} onClick={insertAfterSecond}>
        Insert 9 After Second Node
      </button>
      <NodeChain head={head} />
    </div>
  );
};

const PrependDemoLive = () => {
  const idRef = useRef(2);
  const [head, setHead] = useState(() => new DemoNode("Old Head", 1));

  const prepend = () => {
    idRef.current += 1;
    const newNode = new DemoNode("New Head", idRef.current);
    newNode.next = head;
    setHead(newNode);
  };

  return (
    <div>
      <button style={buttonStyles} onClick={prepend}>
        Prepend
      </button>
      <NodeChain head={head} />
    </div>
  );
};

const DeletionDemoLive = () => {
  const [head, setHead] = useState(() => {
    const a = new DemoNode("A", 1);
    const b = new DemoNode("B", 2);
    const c = new DemoNode("C", 3);
    a.next = b;
    b.next = c;
    return a;
  });

  const deleteB = () => {
    setHead((currentHead) => {
      const copiedHead = cloneList(currentHead);
      let current = copiedHead;
      while (current && current.next) {
        if (current.next.data === "B") {
          current.next = current.next.next;
          return copiedHead;
        }
        current = current.next;
      }
      return copiedHead;
    });
  };

  return (
    <div>
      <button style={buttonStyles} onClick={deleteB}>
        Delete B
      </button>
      <NodeChain head={head} />
    </div>
  );
};

const DeleteHeadDemoLive = () => {
  const [head, setHead] = useState(() => {
    const one = new DemoNode("1", 1);
    const two = new DemoNode("2", 2);
    const three = new DemoNode("3", 3);
    one.next = two;
    two.next = three;
    return one;
  });

  const removeFirst = () => {
    if (head) setHead(head.next);
  };

  return (
    <div>
      <button style={buttonStyles} onClick={removeFirst}>
        Remove Head
      </button>
      <NodeChain head={head} />
    </div>
  );
};

const RecapSection = () => {
  const conceptualSections = [
    "Anatomy of a Node: Data + Next pointer structure.",
    "Significance of the Head: The anchor of the list.",
    "Sequential Traversal: Following the chain one by one (O(N)).",
    "Structural Modification: Pointer re-wiring for O(1) updates.",
  ];

  const bestPracticeHighlights = [
    "Handle Head edge cases first.",
    "Order of operations prevents broken chains.",
    "Use null-checks to prevent pointer errors.",
  ];

  const conceptTable = [
    ["Node", "Data box with a string tie."],
    ["Head", "The front door entry point."],
    ["Traversal", "Walking the line."],
    ["Insertion", "Squeezing into line."],
    ["Deletion", "Jumping over a person."],
  ];

  return (
    <section
      style={{
        background: "#2c3e50",
        color: "#ffffff",
        borderRadius: "20px",
        padding: "36px",
        marginBottom: "40px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      }}
    >
      <h1 style={{ fontSize: "38px", margin: "0 0 8px 0" }}>Conclusion</h1>
      <h2 style={{ fontSize: "24px", color: "#f1c40f", margin: "0 0 28px 0" }}>
        The Journey of Linear Connectivity: Mastering Singly Linked Lists
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "22px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            background: "#34495e",
            borderRadius: "16px",
            padding: "22px",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <h3 style={{ fontSize: "22px", marginTop: 0, color: "#85d8ff" }}>
            Conceptual Sections
          </h3>
          {conceptualSections.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#22313f",
                padding: "14px",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#34495e",
            borderRadius: "16px",
            padding: "22px",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <h3 style={{ fontSize: "22px", marginTop: 0, color: "#85d8ff" }}>
            Best Practice Highlights
          </h3>
          {bestPracticeHighlights.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#22313f",
                padding: "14px",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          color: "#2c3e50",
          borderRadius: "16px",
          padding: "22px",
          marginBottom: "28px",
        }}
      >
        <h3 style={{ fontSize: "22px", marginTop: 0 }}>Concept Table</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                  background: "#ecf6fd",
                  border: "1px solid #d9e6ef",
                }}
              >
                Concept
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                  background: "#ecf6fd",
                  border: "1px solid #d9e6ef",
                }}
              >
                Simple Terms
              </th>
            </tr>
          </thead>
          <tbody>
            {conceptTable.map(([concept, simpleTerms]) => (
              <tr key={concept}>
                <td style={{ padding: "12px", border: "1px solid #d9e6ef", fontWeight: 700 }}>
                  {concept}
                </td>
                <td style={{ padding: "12px", border: "1px solid #d9e6ef" }}>
                  {simpleTerms}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          background: "#f1c40f",
          color: "#2c3e50",
          borderRadius: "16px",
          padding: "22px",
          fontSize: "22px",
          fontWeight: 800,
        }}
      >
        Linked lists prioritize structural flexibility over access speed.
      </div>
    </section>
  );
};

const demoCodeExamples = {
  SinglyLinkedListDemo: "import React, { useRef, useState } from 'react';\n\nconst buttonStyles = {\n  padding: \"10px 16px\",\n  border: \"none\",\n  borderRadius: \"10px\",\n  background: \"#3498db\",\n  color: \"#ffffff\",\n  fontWeight: 700,\n  cursor: \"pointer\",\n  marginRight: \"8px\",\n  marginBottom: \"8px\",\n};\n\nconst nodeStyles = {\n  display: \"inline-flex\",\n  alignItems: \"center\",\n  justifyContent: \"center\",\n  minWidth: \"74px\",\n  minHeight: \"48px\",\n  border: \"2px solid #3498db\",\n  borderRadius: \"12px\",\n  background: \"#ecf6fd\",\n  fontWeight: 700,\n  margin: \"8px\",\n};\n\nconst arrowStyles = {\n  fontSize: \"24px\",\n  fontWeight: 800,\n  color: \"#2c3e50\",\n};\n\nclass DemoNode {\n  constructor(data, id, next = null) {\n    this.data = data;\n    this.id = id;\n    this.next = next;\n  }\n}\n\nconst linkedListToArray = (head) => {\n  const values = [];\n  let current = head;\n  while (current !== null) {\n    values.push(current);\n    current = current.next;\n  }\n  return values;\n};\n\nconst cloneList = (head) => {\n  if (!head) return null;\n  const newHead = new DemoNode(head.data, head.id);\n  let sourceCurrent = head.next;\n  let cloneCurrent = newHead;\n\n  while (sourceCurrent) {\n    cloneCurrent.next = new DemoNode(sourceCurrent.data, sourceCurrent.id);\n    cloneCurrent = cloneCurrent.next;\n    sourceCurrent = sourceCurrent.next;\n  }\n\n  return newHead;\n};\n\nconst NodeChain = ({ head }) => {\n  const nodes = linkedListToArray(head);\n\n  if (nodes.length === 0) {\n    return <div style={{ color: \"#7f8c8d\", fontWeight: 700 }}>Empty list</div>;\n  }\n\n  return (\n    <div style={{ display: \"flex\", alignItems: \"center\", flexWrap: \"wrap\" }}>\n      {nodes.map((node, index) => (\n        <React.Fragment key={node.id}>\n          <div style={nodeStyles}>{node.data}</div>\n          {index < nodes.length - 1 && <span style={arrowStyles}>\u2192</span>}\n        </React.Fragment>\n      ))}\n      <span style={{ ...arrowStyles, color: \"#95a5a6\" }}>\u2192 null</span>\n    </div>\n  );\n};\n\nconst SinglyLinkedListDemo = () => {\n  const idRef = useRef(2);\n  const [head, setHead] = useState(() => new DemoNode(1, 1));\n\n  const addNode = () => {\n    setHead((currentHead) => {\n      const copiedHead = cloneList(currentHead);\n      let current = copiedHead;\n      while (current.next !== null) {\n        current = current.next;\n      }\n      idRef.current += 1;\n      current.next = new DemoNode(idRef.current, idRef.current);\n      return copiedHead;\n    });\n  };\n\n  return (\n    <div>\n      <button style={buttonStyles} onClick={addNode}>\n        Add Node\n      </button>\n      <NodeChain head={head} />\n    </div>\n  );\n};\n\nexport default SinglyLinkedListDemo;",

  NodeStructureDemo: "import React, { useRef, useState } from 'react';\n\nconst buttonStyles = {\n  padding: \"10px 16px\",\n  border: \"none\",\n  borderRadius: \"10px\",\n  background: \"#3498db\",\n  color: \"#ffffff\",\n  fontWeight: 700,\n  cursor: \"pointer\",\n  marginRight: \"8px\",\n  marginBottom: \"8px\",\n};\n\nconst nodeStyles = {\n  display: \"inline-flex\",\n  alignItems: \"center\",\n  justifyContent: \"center\",\n  minWidth: \"74px\",\n  minHeight: \"48px\",\n  border: \"2px solid #3498db\",\n  borderRadius: \"12px\",\n  background: \"#ecf6fd\",\n  fontWeight: 700,\n  margin: \"8px\",\n};\n\nconst arrowStyles = {\n  fontSize: \"24px\",\n  fontWeight: 800,\n  color: \"#2c3e50\",\n};\n\nclass DemoNode {\n  constructor(data, id, next = null) {\n    this.data = data;\n    this.id = id;\n    this.next = next;\n  }\n}\n\nconst linkedListToArray = (head) => {\n  const values = [];\n  let current = head;\n  while (current !== null) {\n    values.push(current);\n    current = current.next;\n  }\n  return values;\n};\n\nconst cloneList = (head) => {\n  if (!head) return null;\n  const newHead = new DemoNode(head.data, head.id);\n  let sourceCurrent = head.next;\n  let cloneCurrent = newHead;\n\n  while (sourceCurrent) {\n    cloneCurrent.next = new DemoNode(sourceCurrent.data, sourceCurrent.id);\n    cloneCurrent = cloneCurrent.next;\n    sourceCurrent = sourceCurrent.next;\n  }\n\n  return newHead;\n};\n\nconst NodeChain = ({ head }) => {\n  const nodes = linkedListToArray(head);\n\n  if (nodes.length === 0) {\n    return <div style={{ color: \"#7f8c8d\", fontWeight: 700 }}>Empty list</div>;\n  }\n\n  return (\n    <div style={{ display: \"flex\", alignItems: \"center\", flexWrap: \"wrap\" }}>\n      {nodes.map((node, index) => (\n        <React.Fragment key={node.id}>\n          <div style={nodeStyles}>{node.data}</div>\n          {index < nodes.length - 1 && <span style={arrowStyles}>\u2192</span>}\n        </React.Fragment>\n      ))}\n      <span style={{ ...arrowStyles, color: \"#95a5a6\" }}>\u2192 null</span>\n    </div>\n  );\n};\n\nconst NodeStructureDemo = () => {\n  const firstNode = new DemoNode(\"Start\", 1);\n  const secondNode = new DemoNode(\"Middle\", 2);\n  firstNode.next = secondNode;\n\n  return (\n    <div>\n      <div style={nodeStyles}>{firstNode.data}</div>\n      <span style={arrowStyles}>\u2192</span>\n      <div style={nodeStyles}>{firstNode.next ? firstNode.next.data : \"Nothing\"}</div>\n      <div style={{ marginTop: \"16px\", fontWeight: 700 }}>\n        Current Node Data: {firstNode.data}\n        <br />\n        Points to: {firstNode.next ? firstNode.next.data : \"Nothing\"}\n      </div>\n    </div>\n  );\n};\n\nexport default NodeStructureDemo;",

  HeadNodeDemo: "import React, { useRef, useState } from 'react';\n\nconst buttonStyles = {\n  padding: \"10px 16px\",\n  border: \"none\",\n  borderRadius: \"10px\",\n  background: \"#3498db\",\n  color: \"#ffffff\",\n  fontWeight: 700,\n  cursor: \"pointer\",\n  marginRight: \"8px\",\n  marginBottom: \"8px\",\n};\n\nconst nodeStyles = {\n  display: \"inline-flex\",\n  alignItems: \"center\",\n  justifyContent: \"center\",\n  minWidth: \"74px\",\n  minHeight: \"48px\",\n  border: \"2px solid #3498db\",\n  borderRadius: \"12px\",\n  background: \"#ecf6fd\",\n  fontWeight: 700,\n  margin: \"8px\",\n};\n\nconst arrowStyles = {\n  fontSize: \"24px\",\n  fontWeight: 800,\n  color: \"#2c3e50\",\n};\n\nclass DemoNode {\n  constructor(data, id, next = null) {\n    this.data = data;\n    this.id = id;\n    this.next = next;\n  }\n}\n\nconst linkedListToArray = (head) => {\n  const values = [];\n  let current = head;\n  while (current !== null) {\n    values.push(current);\n    current = current.next;\n  }\n  return values;\n};\n\nconst cloneList = (head) => {\n  if (!head) return null;\n  const newHead = new DemoNode(head.data, head.id);\n  let sourceCurrent = head.next;\n  let cloneCurrent = newHead;\n\n  while (sourceCurrent) {\n    cloneCurrent.next = new DemoNode(sourceCurrent.data, sourceCurrent.id);\n    cloneCurrent = cloneCurrent.next;\n    sourceCurrent = sourceCurrent.next;\n  }\n\n  return newHead;\n};\n\nconst NodeChain = ({ head }) => {\n  const nodes = linkedListToArray(head);\n\n  if (nodes.length === 0) {\n    return <div style={{ color: \"#7f8c8d\", fontWeight: 700 }}>Empty list</div>;\n  }\n\n  return (\n    <div style={{ display: \"flex\", alignItems: \"center\", flexWrap: \"wrap\" }}>\n      {nodes.map((node, index) => (\n        <React.Fragment key={node.id}>\n          <div style={nodeStyles}>{node.data}</div>\n          {index < nodes.length - 1 && <span style={arrowStyles}>\u2192</span>}\n        </React.Fragment>\n      ))}\n      <span style={{ ...arrowStyles, color: \"#95a5a6\" }}>\u2192 null</span>\n    </div>\n  );\n};\n\nconst HeadNodeDemo = () => {\n  const idRef = useRef(3);\n  const [head, setHead] = useState(() => {\n    const first = new DemoNode(\"Head\", 1);\n    first.next = new DemoNode(\"Second\", 2);\n    return first;\n  });\n\n  const appendNode = () => {\n    setHead((currentHead) => {\n      const copiedHead = cloneList(currentHead);\n      let current = copiedHead;\n      while (current.next) {\n        current = current.next;\n      }\n      idRef.current += 1;\n      current.next = new DemoNode(`Node ${idRef.current}`, idRef.current);\n      return copiedHead;\n    });\n  };\n\n  return (\n    <div>\n      <button style={buttonStyles} onClick={appendNode}>\n        Append Node\n      </button>\n      <div style={{ marginBottom: \"10px\", fontWeight: 700 }}>Head points to the first node.</div>\n      <NodeChain head={head} />\n    </div>\n  );\n};\n\nexport default HeadNodeDemo;",

  TraversalDemo: "import React, { useRef, useState } from 'react';\n\nconst buttonStyles = {\n  padding: \"10px 16px\",\n  border: \"none\",\n  borderRadius: \"10px\",\n  background: \"#3498db\",\n  color: \"#ffffff\",\n  fontWeight: 700,\n  cursor: \"pointer\",\n  marginRight: \"8px\",\n  marginBottom: \"8px\",\n};\n\nconst nodeStyles = {\n  display: \"inline-flex\",\n  alignItems: \"center\",\n  justifyContent: \"center\",\n  minWidth: \"74px\",\n  minHeight: \"48px\",\n  border: \"2px solid #3498db\",\n  borderRadius: \"12px\",\n  background: \"#ecf6fd\",\n  fontWeight: 700,\n  margin: \"8px\",\n};\n\nconst arrowStyles = {\n  fontSize: \"24px\",\n  fontWeight: 800,\n  color: \"#2c3e50\",\n};\n\nclass DemoNode {\n  constructor(data, id, next = null) {\n    this.data = data;\n    this.id = id;\n    this.next = next;\n  }\n}\n\nconst linkedListToArray = (head) => {\n  const values = [];\n  let current = head;\n  while (current !== null) {\n    values.push(current);\n    current = current.next;\n  }\n  return values;\n};\n\nconst cloneList = (head) => {\n  if (!head) return null;\n  const newHead = new DemoNode(head.data, head.id);\n  let sourceCurrent = head.next;\n  let cloneCurrent = newHead;\n\n  while (sourceCurrent) {\n    cloneCurrent.next = new DemoNode(sourceCurrent.data, sourceCurrent.id);\n    cloneCurrent = cloneCurrent.next;\n    sourceCurrent = sourceCurrent.next;\n  }\n\n  return newHead;\n};\n\nconst NodeChain = ({ head }) => {\n  const nodes = linkedListToArray(head);\n\n  if (nodes.length === 0) {\n    return <div style={{ color: \"#7f8c8d\", fontWeight: 700 }}>Empty list</div>;\n  }\n\n  return (\n    <div style={{ display: \"flex\", alignItems: \"center\", flexWrap: \"wrap\" }}>\n      {nodes.map((node, index) => (\n        <React.Fragment key={node.id}>\n          <div style={nodeStyles}>{node.data}</div>\n          {index < nodes.length - 1 && <span style={arrowStyles}>\u2192</span>}\n        </React.Fragment>\n      ))}\n      <span style={{ ...arrowStyles, color: \"#95a5a6\" }}>\u2192 null</span>\n    </div>\n  );\n};\n\nconst TraversalDemo = () => {\n  const [visited, setVisited] = useState([]);\n  const [head] = useState(() => {\n    const n1 = new DemoNode(\"Node A\", 1);\n    const n2 = new DemoNode(\"Node B\", 2);\n    const n3 = new DemoNode(\"Node C\", 3);\n    n1.next = n2;\n    n2.next = n3;\n    return n1;\n  });\n\n  const traverse = () => {\n    const elements = [];\n    let current = head;\n    while (current !== null) {\n      elements.push(current.data);\n      current = current.next;\n    }\n    setVisited(elements);\n  };\n\n  return (\n    <div>\n      <button style={buttonStyles} onClick={traverse}>\n        Traverse List\n      </button>\n      <NodeChain head={head} />\n      <div style={{ marginTop: \"16px\", fontWeight: 700 }}>\n        Visited: {visited.length ? visited.join(\" \u2192 \") : \"Not traversed yet\"}\n      </div>\n    </div>\n  );\n};\n\nexport default TraversalDemo;",

  InsertionDemoLive: "import React, { useRef, useState } from 'react';\n\nconst buttonStyles = {\n  padding: \"10px 16px\",\n  border: \"none\",\n  borderRadius: \"10px\",\n  background: \"#3498db\",\n  color: \"#ffffff\",\n  fontWeight: 700,\n  cursor: \"pointer\",\n  marginRight: \"8px\",\n  marginBottom: \"8px\",\n};\n\nconst nodeStyles = {\n  display: \"inline-flex\",\n  alignItems: \"center\",\n  justifyContent: \"center\",\n  minWidth: \"74px\",\n  minHeight: \"48px\",\n  border: \"2px solid #3498db\",\n  borderRadius: \"12px\",\n  background: \"#ecf6fd\",\n  fontWeight: 700,\n  margin: \"8px\",\n};\n\nconst arrowStyles = {\n  fontSize: \"24px\",\n  fontWeight: 800,\n  color: \"#2c3e50\",\n};\n\nclass DemoNode {\n  constructor(data, id, next = null) {\n    this.data = data;\n    this.id = id;\n    this.next = next;\n  }\n}\n\nconst linkedListToArray = (head) => {\n  const values = [];\n  let current = head;\n  while (current !== null) {\n    values.push(current);\n    current = current.next;\n  }\n  return values;\n};\n\nconst cloneList = (head) => {\n  if (!head) return null;\n  const newHead = new DemoNode(head.data, head.id);\n  let sourceCurrent = head.next;\n  let cloneCurrent = newHead;\n\n  while (sourceCurrent) {\n    cloneCurrent.next = new DemoNode(sourceCurrent.data, sourceCurrent.id);\n    cloneCurrent = cloneCurrent.next;\n    sourceCurrent = sourceCurrent.next;\n  }\n\n  return newHead;\n};\n\nconst NodeChain = ({ head }) => {\n  const nodes = linkedListToArray(head);\n\n  if (nodes.length === 0) {\n    return <div style={{ color: \"#7f8c8d\", fontWeight: 700 }}>Empty list</div>;\n  }\n\n  return (\n    <div style={{ display: \"flex\", alignItems: \"center\", flexWrap: \"wrap\" }}>\n      {nodes.map((node, index) => (\n        <React.Fragment key={node.id}>\n          <div style={nodeStyles}>{node.data}</div>\n          {index < nodes.length - 1 && <span style={arrowStyles}>\u2192</span>}\n        </React.Fragment>\n      ))}\n      <span style={{ ...arrowStyles, color: \"#95a5a6\" }}>\u2192 null</span>\n    </div>\n  );\n};\n\nconst InsertionDemoLive = () => {\n  const [head, setHead] = useState(() => {\n    const n1 = new DemoNode(1, 1);\n    const n2 = new DemoNode(2, 2);\n    const n3 = new DemoNode(3, 3);\n    n1.next = n2;\n    n2.next = n3;\n    return n1;\n  });\n\n  const insertAfterSecond = () => {\n    setHead((currentHead) => {\n      const copiedHead = cloneList(currentHead);\n      let secondNode = copiedHead.next;\n      if (secondNode && secondNode.next && secondNode.next.data !== 9) {\n        const newNode = new DemoNode(9, 9);\n        newNode.next = secondNode.next;\n        secondNode.next = newNode;\n      }\n      return copiedHead;\n    });\n  };\n\n  return (\n    <div>\n      <button style={buttonStyles} onClick={insertAfterSecond}>\n        Insert 9 After Second Node\n      </button>\n      <NodeChain head={head} />\n    </div>\n  );\n};\n\nexport default InsertionDemoLive;",

  PrependDemoLive: "import React, { useRef, useState } from 'react';\n\nconst buttonStyles = {\n  padding: \"10px 16px\",\n  border: \"none\",\n  borderRadius: \"10px\",\n  background: \"#3498db\",\n  color: \"#ffffff\",\n  fontWeight: 700,\n  cursor: \"pointer\",\n  marginRight: \"8px\",\n  marginBottom: \"8px\",\n};\n\nconst nodeStyles = {\n  display: \"inline-flex\",\n  alignItems: \"center\",\n  justifyContent: \"center\",\n  minWidth: \"74px\",\n  minHeight: \"48px\",\n  border: \"2px solid #3498db\",\n  borderRadius: \"12px\",\n  background: \"#ecf6fd\",\n  fontWeight: 700,\n  margin: \"8px\",\n};\n\nconst arrowStyles = {\n  fontSize: \"24px\",\n  fontWeight: 800,\n  color: \"#2c3e50\",\n};\n\nclass DemoNode {\n  constructor(data, id, next = null) {\n    this.data = data;\n    this.id = id;\n    this.next = next;\n  }\n}\n\nconst linkedListToArray = (head) => {\n  const values = [];\n  let current = head;\n  while (current !== null) {\n    values.push(current);\n    current = current.next;\n  }\n  return values;\n};\n\nconst cloneList = (head) => {\n  if (!head) return null;\n  const newHead = new DemoNode(head.data, head.id);\n  let sourceCurrent = head.next;\n  let cloneCurrent = newHead;\n\n  while (sourceCurrent) {\n    cloneCurrent.next = new DemoNode(sourceCurrent.data, sourceCurrent.id);\n    cloneCurrent = cloneCurrent.next;\n    sourceCurrent = sourceCurrent.next;\n  }\n\n  return newHead;\n};\n\nconst NodeChain = ({ head }) => {\n  const nodes = linkedListToArray(head);\n\n  if (nodes.length === 0) {\n    return <div style={{ color: \"#7f8c8d\", fontWeight: 700 }}>Empty list</div>;\n  }\n\n  return (\n    <div style={{ display: \"flex\", alignItems: \"center\", flexWrap: \"wrap\" }}>\n      {nodes.map((node, index) => (\n        <React.Fragment key={node.id}>\n          <div style={nodeStyles}>{node.data}</div>\n          {index < nodes.length - 1 && <span style={arrowStyles}>\u2192</span>}\n        </React.Fragment>\n      ))}\n      <span style={{ ...arrowStyles, color: \"#95a5a6\" }}>\u2192 null</span>\n    </div>\n  );\n};\n\nconst PrependDemoLive = () => {\n  const idRef = useRef(2);\n  const [head, setHead] = useState(() => new DemoNode(\"Old Head\", 1));\n\n  const prepend = () => {\n    idRef.current += 1;\n    const newNode = new DemoNode(\"New Head\", idRef.current);\n    newNode.next = head;\n    setHead(newNode);\n  };\n\n  return (\n    <div>\n      <button style={buttonStyles} onClick={prepend}>\n        Prepend\n      </button>\n      <NodeChain head={head} />\n    </div>\n  );\n};\n\nexport default PrependDemoLive;",

  DeletionDemoLive: "import React, { useRef, useState } from 'react';\n\nconst buttonStyles = {\n  padding: \"10px 16px\",\n  border: \"none\",\n  borderRadius: \"10px\",\n  background: \"#3498db\",\n  color: \"#ffffff\",\n  fontWeight: 700,\n  cursor: \"pointer\",\n  marginRight: \"8px\",\n  marginBottom: \"8px\",\n};\n\nconst nodeStyles = {\n  display: \"inline-flex\",\n  alignItems: \"center\",\n  justifyContent: \"center\",\n  minWidth: \"74px\",\n  minHeight: \"48px\",\n  border: \"2px solid #3498db\",\n  borderRadius: \"12px\",\n  background: \"#ecf6fd\",\n  fontWeight: 700,\n  margin: \"8px\",\n};\n\nconst arrowStyles = {\n  fontSize: \"24px\",\n  fontWeight: 800,\n  color: \"#2c3e50\",\n};\n\nclass DemoNode {\n  constructor(data, id, next = null) {\n    this.data = data;\n    this.id = id;\n    this.next = next;\n  }\n}\n\nconst linkedListToArray = (head) => {\n  const values = [];\n  let current = head;\n  while (current !== null) {\n    values.push(current);\n    current = current.next;\n  }\n  return values;\n};\n\nconst cloneList = (head) => {\n  if (!head) return null;\n  const newHead = new DemoNode(head.data, head.id);\n  let sourceCurrent = head.next;\n  let cloneCurrent = newHead;\n\n  while (sourceCurrent) {\n    cloneCurrent.next = new DemoNode(sourceCurrent.data, sourceCurrent.id);\n    cloneCurrent = cloneCurrent.next;\n    sourceCurrent = sourceCurrent.next;\n  }\n\n  return newHead;\n};\n\nconst NodeChain = ({ head }) => {\n  const nodes = linkedListToArray(head);\n\n  if (nodes.length === 0) {\n    return <div style={{ color: \"#7f8c8d\", fontWeight: 700 }}>Empty list</div>;\n  }\n\n  return (\n    <div style={{ display: \"flex\", alignItems: \"center\", flexWrap: \"wrap\" }}>\n      {nodes.map((node, index) => (\n        <React.Fragment key={node.id}>\n          <div style={nodeStyles}>{node.data}</div>\n          {index < nodes.length - 1 && <span style={arrowStyles}>\u2192</span>}\n        </React.Fragment>\n      ))}\n      <span style={{ ...arrowStyles, color: \"#95a5a6\" }}>\u2192 null</span>\n    </div>\n  );\n};\n\nconst DeletionDemoLive = () => {\n  const [head, setHead] = useState(() => {\n    const a = new DemoNode(\"A\", 1);\n    const b = new DemoNode(\"B\", 2);\n    const c = new DemoNode(\"C\", 3);\n    a.next = b;\n    b.next = c;\n    return a;\n  });\n\n  const deleteB = () => {\n    setHead((currentHead) => {\n      const copiedHead = cloneList(currentHead);\n      let current = copiedHead;\n      while (current && current.next) {\n        if (current.next.data === \"B\") {\n          current.next = current.next.next;\n          return copiedHead;\n        }\n        current = current.next;\n      }\n      return copiedHead;\n    });\n  };\n\n  return (\n    <div>\n      <button style={buttonStyles} onClick={deleteB}>\n        Delete B\n      </button>\n      <NodeChain head={head} />\n    </div>\n  );\n};\n\nexport default DeletionDemoLive;",

  DeleteHeadDemoLive: "import React, { useRef, useState } from 'react';\n\nconst buttonStyles = {\n  padding: \"10px 16px\",\n  border: \"none\",\n  borderRadius: \"10px\",\n  background: \"#3498db\",\n  color: \"#ffffff\",\n  fontWeight: 700,\n  cursor: \"pointer\",\n  marginRight: \"8px\",\n  marginBottom: \"8px\",\n};\n\nconst nodeStyles = {\n  display: \"inline-flex\",\n  alignItems: \"center\",\n  justifyContent: \"center\",\n  minWidth: \"74px\",\n  minHeight: \"48px\",\n  border: \"2px solid #3498db\",\n  borderRadius: \"12px\",\n  background: \"#ecf6fd\",\n  fontWeight: 700,\n  margin: \"8px\",\n};\n\nconst arrowStyles = {\n  fontSize: \"24px\",\n  fontWeight: 800,\n  color: \"#2c3e50\",\n};\n\nclass DemoNode {\n  constructor(data, id, next = null) {\n    this.data = data;\n    this.id = id;\n    this.next = next;\n  }\n}\n\nconst linkedListToArray = (head) => {\n  const values = [];\n  let current = head;\n  while (current !== null) {\n    values.push(current);\n    current = current.next;\n  }\n  return values;\n};\n\nconst cloneList = (head) => {\n  if (!head) return null;\n  const newHead = new DemoNode(head.data, head.id);\n  let sourceCurrent = head.next;\n  let cloneCurrent = newHead;\n\n  while (sourceCurrent) {\n    cloneCurrent.next = new DemoNode(sourceCurrent.data, sourceCurrent.id);\n    cloneCurrent = cloneCurrent.next;\n    sourceCurrent = sourceCurrent.next;\n  }\n\n  return newHead;\n};\n\nconst NodeChain = ({ head }) => {\n  const nodes = linkedListToArray(head);\n\n  if (nodes.length === 0) {\n    return <div style={{ color: \"#7f8c8d\", fontWeight: 700 }}>Empty list</div>;\n  }\n\n  return (\n    <div style={{ display: \"flex\", alignItems: \"center\", flexWrap: \"wrap\" }}>\n      {nodes.map((node, index) => (\n        <React.Fragment key={node.id}>\n          <div style={nodeStyles}>{node.data}</div>\n          {index < nodes.length - 1 && <span style={arrowStyles}>\u2192</span>}\n        </React.Fragment>\n      ))}\n      <span style={{ ...arrowStyles, color: \"#95a5a6\" }}>\u2192 null</span>\n    </div>\n  );\n};\n\nconst DeleteHeadDemoLive = () => {\n  const [head, setHead] = useState(() => {\n    const one = new DemoNode(\"1\", 1);\n    const two = new DemoNode(\"2\", 2);\n    const three = new DemoNode(\"3\", 3);\n    one.next = two;\n    two.next = three;\n    return one;\n  });\n\n  const removeFirst = () => {\n    if (head) setHead(head.next);\n  };\n\n  return (\n    <div>\n      <button style={buttonStyles} onClick={removeFirst}>\n        Remove Head\n      </button>\n      <NodeChain head={head} />\n    </div>\n  );\n};\n\nexport default DeleteHeadDemoLive;"
}

const slides = [
  {
    title: "Introduction to Singly Linked Lists",
    concept: "Singly Linked List Structure and Mechanics",
    slideData: [
      "Definition and comparison with arrays",
      "Structure consisting of nodes linked by pointers",
      "Each node contains data and a reference to the next node",
      "Advantages in dynamic operations like insertions and deletions",
    ],
    description: 'A Singly Linked List is a linear data structure where elements are not stored in contiguous memory locations. Instead, the list is composed of "nodes." Each node acts as a container that holds two distinct pieces of information: the actual data (or value) and a pointer (or reference) to the next node in the sequence. Unlike arrays, which have a fixed size and require shifting elements for insertions or deletions, linked lists are dynamic. They allow for efficient memory usage and fast modifications because you only need to update the pointers of the surrounding nodes rather than reorganizing the entire collection.',
    realWorldApplication: 'A classic example is a "scavenger hunt" trail. Each location (node) has a prize (data) and a physical map or clue (pointer) that directs you exactly where to find the next location. You don\'t need to know where every location is at the start; you simply follow the path from one to the next.',
    broadScaleUsage: "In large-scale system architecture, linked lists serve as the foundation for complex structures like adjacency lists in graphs or implementation of undo/redo functionality in software. They provide the flexibility to grow or shrink the data set instantly without the heavy performance cost of reallocating large blocks of memory, which is essential for high-frequency data streams.",
    narrowedApproach: 'To implement this in a modern environment, we define a blueprint for a Node. In React-based logic, we treat the state of our list as an object where the "head" is our starting point. We use references to link one object to the next. When we want to add an item, we create a new node and point the previous node\'s "next" property to our new arrival.',
    codeExample: demoCodeExamples.SinglyLinkedListDemo,
    simpleTermsExplanation: 'The code starts by defining a class called ListNode. Think of this as a factory that makes "boxes." Each box has two compartments: one for a number (val) and one for a string that ties it to the next box (next). Inside our React component, we use useState to keep track of the very first box in our chain, which we call the head. When the addNode function is triggered, we use the ListNode factory to create a brand new box. To connect them, we take our original head box and put the "address" of the new box into its next compartment. Finally, we update the React state so the UI knows the chain has changed.',
    entryComponentName: 'SinglyLinkedListDemo',
  },
  {
    title: "Node Structure",
    concept: "The Atomic Unit of Linked Lists",
    slideData: [
      "Basic building block of a singly linked list",
      "Contains a value and a reference to the next node",
      "Example code in Java to define a node",
      "Importance of the 'next' reference in linking nodes",
    ],
    description: 'A "Node" is the fundamental atomic unit that makes a linked list possible. It is a self-contained object that serves two purposes: storing a piece of information and maintaining the structural integrity of the list by pointing to the subsequent element. Without the "next" reference, the nodes would be isolated data points in memory with no relationship to one another. The "next" pointer acts as the glue, creating a chain-like structure where each element "knows" who follows it, but notably, does not know who precedes it in a singly linked list.',
    realWorldApplication: "Think of a train where each car is a node. Every car carries specific cargo (the value). More importantly, every car has a mechanical coupling at the rear (the 'next' reference) that hooks into the car behind it. If a coupling breaks or is reassigned, the sequence of the train changes immediately without needing to physically lift and rearrange the cars on the track.",
    broadScaleUsage: 'In memory management systems, node structures are used to keep track of free blocks of memory. By using a linked list of "free nodes," the operating system can quickly allocate space for new programs. Because the nodes are linked via references, the OS can manage non-contiguous chunks of memory efficiently, preventing the need for constant, expensive memory defragmentation.',
    narrowedApproach: 'In a React environment using Vite, we define the Node structure as a standard JavaScript class or a factory function. When managing this in state, we ensure that each node object is treated as immutable. To update a "next" reference, we create a shallow copy of the node to trigger React\'s re-render cycle, ensuring the UI accurately reflects the current state of the chain.',
    codeExample: demoCodeExamples.NodeStructureDemo,
    simpleTermsExplanation: 'The code creates a blueprint called Node. Imagine this blueprint as a template for a two-room apartment. One room is named data, where you store your belongings. The other room is named next, which contains the physical address of the next apartment in the complex. When we write this.next = null in the constructor, we are saying that when a node is first created, it doesn\'t point to anyone yet. By writing firstNode.next = secondNode, we are taking the "address" of the second apartment and writing it down inside the next room of the first apartment.',
    entryComponentName: 'NodeStructureDemo',
  },
  {
    title: "The Head Node",
    concept: "The List Entry Point and Management",
    slideData: [
      "The entry point to a singly linked list",
      "Holds the first element and points to the subsequent node",
      "Represents the entire list for operations",
      "Crucial for traversal, insertion, and deletion",
    ],
    description: 'The "Head" node is the most critical part of a linked list because it serves as the only permanent anchor for the entire structure. Since nodes are scattered in memory, if you lose the reference to the head, you lose the entire list. In programming, the head represents the list itself; to perform any action you must start at the head and follow the chain of "next" pointers until you reach your destination.',
    realWorldApplication: "Imagine a single-file line of people where everyone is blindfolded except for the person at the very front. To find someone in the line, you must first locate the person at the front (the Head) and have them tap the shoulder of the person behind them.",
    broadScaleUsage: 'In operating system task scheduling, the "Head" of a linked list often points to the next process waiting for CPU time. By maintaining a pointer to the head, the system can quickly access the next task. When a task is completed, the head pointer is simply moved to the next node.',
    narrowedApproach: 'In a React/Vite application, we typically manage the "Head" using the useState hook. When we append a new node, we traverse the list starting from the head, create the new links, and then update the state with a new reference to the head to trigger a UI update.',
    codeExample: demoCodeExamples.HeadNodeDemo,
    simpleTermsExplanation: 'The code sets up a management system where the head variable is the "front door" to our data. When the list is empty, head is null. When we call appendNode, we create a new person (a Node). If there are already people inside, we start at the head and ask, "Is there someone behind you?" until we find the last person. In React, we do this by making a copy of the head first, then showing that new photo to React so it knows it needs to refresh the screen.',
    entryComponentName: 'HeadNodeDemo',
  },
  {
    title: "Traversing the List",
    concept: "Sequential Data Access Mechanics",
    slideData: [
      "Accessing elements by sequential traversal",
      "Starts from the head and follows 'next' references",
      "Time complexity of O(N) for element access",
      "Comparison with direct access in arrays",
    ],
    description: 'Traversal is the process of visiting every node in a linked list systematically. Unlike an array, a linked list requires you to start at the "Head" and manually step through each link until you find the desired data. Because you must potentially visit every node, the time complexity is O(N).',
    realWorldApplication: 'Consider a "Connect the Dots" puzzle. You cannot jump to dot #50 immediately. You must find dot #1, follow the line to dot #2, then to #3, and so on.',
    broadScaleUsage: 'In networking protocols, traversal is used to process packets in a buffer. When a system needs to verify a chain of trust, it starts with the root and "traverses" each intermediate signature until it reaches the destination.',
    narrowedApproach: 'In a React/Vite context, traversal is often used to transform the linked list data into a format the UI can render, such as an array of JSX elements. We traverse the list to "flatten" it into a standard array that we can then map over.',
    codeExample: demoCodeExamples.TraversalDemo,
    simpleTermsExplanation: 'The code demonstrates how to "walk" through the list. We start by creating a temporary pointer called current and pointing it at the head. Inside the while loop, we ask: "Is my finger pointing at a real person?" If yes, we take their name and move the finger to the person they are holding hands with.',
    entryComponentName: 'TraversalDemo',
  },
  {
    title: "Inserting a New Node",
    concept: "Efficient Structural Modification",
    slideData: [
      "Efficiency of insertion operations",
      "Steps: create a new node, link to next, update previous node's next",
      "O(1) time complexity with known previous node",
      "Example: Inserting a node with value 9 after the second node",
    ],
    description: 'To insert an element, you only need to perform two steps: point the new node\'s "next" to the previous node\'s "next," and then update the previous node\'s "next" to point to the new node. If the location is already known, this operation happens in O(1) constant time.',
    realWorldApplication: "Imagine a chain-link fence where you want to add a decorative ornament. You unhook link A from link B, hook link A to the ornament, and hook the ornament to link B.",
    broadScaleUsage: "This efficiency is vital in high-throughput systems like real-time event logs. When a high-priority task needs to be inserted into a specific spot, a linked list allows the system to slot it in instantly.",
    narrowedApproach: 'In a React/Vite environment, we handle insertion immutably. We traverse to the target point, perform the "re-wiring" on a cloned version of our list structure, and then update our state.',
    codeExample: demoCodeExamples.InsertionDemoLive,
    simpleTermsExplanation: 'Before we change the second node\'s "hand," we must make sure the new node (9) is already holding onto the rest of the line. We first set newNode.next = secondNode.next. Now, 9 is holding onto 3. Only then do we tell the second node to let go of 3 and grab 9 instead.',
    entryComponentName: 'InsertionDemoLive',
  },
  {
    title: "Adding a Node at the Beginning",
    concept: "Prepending and Head Reassignment",
    slideData: [
      "Simple steps to add a node at the front",
      "Update the new node's next to the current head",
      "Make the new node the new head",
      "Maintains O(1) time complexity",
    ],
    description: 'Adding a node to the beginning requires pointing the "next" reference of your new node to the current "Head," and then declaring this new node to be the "Head." This operation is O(1) because it takes the same amount of time regardless of list size.',
    realWorldApplication: "Think of a stack of cafeteria trays. When a clean tray is added, it is placed right on top. You don't lift the entire stack; you simply place it on top, and that new tray becomes the first one picked up.",
    broadScaleUsage: 'This "Prepend" method is the backbone of the LIFO data structure known as a Stack. In software, this is used for "Undo" histories. Every time you perform an action, it is added to the front.',
    narrowedApproach: "In React, we create a new node and immediately update the state to point to it. Since the new node already holds a reference to the previous head, the entire chain remains intact.",
    codeExample: demoCodeExamples.PrependDemoLive,
    simpleTermsExplanation: 'Imagine Sarah is the head. To add Tom to the beginning, you tell Tom, "Hold hands with Sarah". Now Tom is connected. The final step is to move the "Official Start" sign over to Tom. React then re-renders to show Tom at the front.',
    entryComponentName: 'PrependDemoLive',
  },
  {
    title: "Deleting a Node",
    concept: "Structural Node Removal via Pointer Bypassing",
    slideData: [
      "Locating the node and its predecessor",
      "Bypassing the target node by updating pointers",
      "O(N) time complexity for traversal",
      "O(1) space complexity for pointer adjustments",
    ],
    description: 'Deletion is a process of bypassing the target node. By pointing the predecessor\'s "next" reference to the target node\'s "next" reference, the target node is effectively cut out. Finding the node requires O(N) traversal.',
    realWorldApplication: "If one person needs to leave a circle of friends holding hands, the person to their left and right simply let go of the departing person and grab each other's hands.",
    broadScaleUsage: 'In garbage-collected environments like JavaScript, once a node is bypassed and no longer reachable from the "Head," the system reclaims that space.',
    narrowedApproach: 'In React, we handle deletion by creating a shallow copy of our list state and performing the bypass logic. If the node to be deleted is the "Head," we update the state to point to the second node.',
    codeExample: demoCodeExamples.DeletionDemoLive,
    simpleTermsExplanation: 'To delete Bob, we go to Amy (the person before Bob). We look at Bob and see who he is holding hands with (Cal). We then tell Amy, "Let go of Bob and grab Cal\'s hand instead." Once Amy is holding Cal\'s hand, Bob is left standing by himself.',
    entryComponentName: 'DeletionDemoLive',
  },
  {
    title: "Deleting the First Node",
    concept: "Head Reassignment for Immediate Removal",
    slideData: [
      "Special case of deletion operation",
      "Simply update the head to the second node",
      "Removes the original head from the list",
      "Demonstrates simplicity and efficiency in linked lists",
    ],
    description: 'Deleting the first node requires no traversal. You take the reference to the second node (found at head.next) and designate it as the new "Head." This maintains O(1) complexity.',
    realWorldApplication: 'When a baker calls the first person in line, that person leaves. The person who was standing second now becomes the new "first" person in line.',
    broadScaleUsage: 'This is the fundamental mechanic for a "Pop" operation in a Stack or "Dequeue" in a Queue. It allows the system to process the oldest message and move on without shifting memory.',
    narrowedApproach: "In React, deleting the first node is handled by passing head.next directly into the state setter. React identifies the top-level reference change and re-renders.",
    codeExample: demoCodeExamples.DeleteHeadDemoLive,
    simpleTermsExplanation: "Think of the head variable as a spotlight. To delete the first person, we move our spotlight to shine on the person they are holding hands with (head.next). Once the spotlight moves, the first person is effectively gone.",
    entryComponentName: 'DeleteHeadDemoLive',
  },
];

const lectureSectionTitles = slides.map((slide) => slide.title)
const lectureSections = slides.map((slide) => (
  <SectionWrapper
    key={slide.title}
    title={slide.title}
    concept={slide.concept}
    slideData={slide.slideData}
    description={slide.description}
    realWorldApplication={slide.realWorldApplication}
    broadScaleUsage={slide.broadScaleUsage}
    narrowedApproach={slide.narrowedApproach}
    codeExample={slide.codeExample}
    entryComponentName={slide.entryComponentName}
    simpleTermsExplanation={slide.simpleTermsExplanation}
  />
))

export default function Week05SinglyLinkedListsMasterclass({
  onBack,
  onSectionChange,
  title = 'Introduction to Singly Linked Lists',
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sectionsCollapsed, setSectionsCollapsed] = useState(false)
  const activeSection = useMemo(() => lectureSections[activeIndex], [activeIndex])

  useEffect(() => {
    if (!onSectionChange) return

    if (activeIndex < lectureSectionTitles.length) {
      onSectionChange({
        index: activeIndex + 1,
        title: lectureSectionTitles[activeIndex],
      })
      return
    }

    onSectionChange({
      index: lectureSectionTitles.length + 1,
      title: 'Best Practices and Recap',
    })
  }, [activeIndex, onSectionChange])

  return (
    <div className="sm-page">
      <div className="sm-toolbar">
        <button className="sm-button ghost" onClick={onBack}>
          ← Back to Week 05
        </button>

        <div className="sm-toolbar-copy">
          <p className="sm-kicker">AD312 • Week 05 • Lecture 01</p>
          <h2>{title}</h2>
        </div>
      </div>

      <div className={`sm-layout ${sectionsCollapsed ? 'sm-layout-sidebar-collapsed' : ''}`}>
        <aside className={`sm-sidebar ${sectionsCollapsed ? 'collapsed' : ''}`}>
          <div className="sm-sidebar-header">
            <div className="sm-sidebar-label">Lecture Sections</div>
            <button
              type="button"
              className="sm-sidebar-toggle"
              aria-label={sectionsCollapsed ? 'Show lecture sections' : 'Hide lecture sections'}
              aria-expanded={!sectionsCollapsed}
              onClick={() => setSectionsCollapsed((isCollapsed) => !isCollapsed)}
            >
              <span aria-hidden="true">{sectionsCollapsed ? '›' : '‹'}</span>
            </button>
          </div>

          {lectureSectionTitles.map((sectionTitle, index) => (
            <button
              key={sectionTitle}
              className={index === activeIndex ? 'sm-nav-button active' : 'sm-nav-button'}
              onClick={() => setActiveIndex(index)}
            >
              <span className="sm-nav-step">{String(index + 1).padStart(2, '0')}</span>
              <span>{sectionTitle}</span>
            </button>
          ))}

          <button
            className={activeIndex === lectureSectionTitles.length ? 'sm-nav-button active' : 'sm-nav-button'}
            onClick={() => setActiveIndex(lectureSectionTitles.length)}
          >
            <span className="sm-nav-step">{String(lectureSectionTitles.length + 1).padStart(2, '0')}</span>
            <span>Best Practices and Recap</span>
          </button>
        </aside>

        <main className="sm-content">
          {activeIndex < lectureSections.length ? activeSection : <RecapSection />}
        </main>
      </div>
    </div>
  )
}


