// Defines the given information for each proof.
var givenTexts = [
	null,
	"<i>A</i> and <i>G</i> are congruent",
	"<i>A</i>, <i>B</i>, <i>C</i>, and <i>D</i> are on a segment and <img class='titleTexts' src='../proofFiles/images/ABCD.png'/>",
	"<i>m</i> is parallel to <i>n</i>"
];

// Defines the proof statements of each proof.
var proofTexts = [
	"<i>A</i> ≅ <i>C</i>",
	"<i>m</i> is parallel to <i>n</i>",
	"<img class='titleTexts' src='../proofFiles/images/ACBD.png'/>",
	"<i>∠D</i> ≅ <i>∠F</i>"
];

// Defines the statements for each proof.
var statements = [
	// Statements for proof 1.
	["<i>A</i> and <i>B</i> are complementary angles", "<i>B</i> and <i>C</i> are complementary angles", "<i>A</i> + <i>B</i> = 90°", "<i>A</i> + <i>B</i> = <i>B</i> + <i>C</i>", "<i>B</i> + <i>C</i> = 90°", "<i>A</i> + <i>B</i> = 180°", "<i>A</i> ≅ <i>C</i>"],
	// Statements for proof 2.
	["<i>A</i> and <i>G</i> are congruent", "<i>m</i> and <i>n</i> are parallel", "<i>E</i> and <i>G</i> are congruent", "<i>A</i> and <i>B</i> are complementary angles", "<i>A</i> and <i>B</i> are supplementary angles", "<i>E</i> and <i>G</i> are vertical angles", "<i>A</i> and <i>E</i> are congruent"],
	// Statements for proof 3.
	["<i>A</i>, <i>B</i>, <i>C</i>, and <i>D</i> are on a segment", "<img class='texts' src='../proofFiles/images/ABCD.png'/>", "<img class='texts' src='../proofFiles/images/ACABBC.png'/>", "<img class='texts' src='../proofFiles/images/ACCDBC.png'/>", "<img class='texts' src='../proofFiles/images/BDCDBC.png'/>", "<img class='texts' src='../proofFiles/images/ACBD.png'/>"],
	// Statements for proof 4.
	["<i>D</i> is congruent to <i>H</i>", "<i>D</i> is congruent to <i>F</i>", "<i>m</i> and <i>n</i> are parallel", "<i>H</i> and <i>F</i> are vertical angles", "<i>H</i> is congruent to <i>F</i>", "<i>D</i> and <i>H</i> are corresponding angles", "<i>A</i> and <i>B</i> are supplementary angles", "<i>A</i> and <i>B</i> are complementary angles"]
];

// Defines the reasons for each proof.
var reasons = [
	// Reasons for proof 1.
	["Sum of complementary angles", "Diagram", "Transitive property of equality", "Diagram", "Addition property of equality", "Reflexive property of congruence", "Sum of complementary angles", "Sum of supplementary angles"],
	// Reasons for proof 2.
	["Diagram", "Transitive property of congruence", "Vertical angles congruence theorem", "Corresponding angles converse", "Commutative property of equality", "Given"],
	// Reasons for proof 3.
	["Segment addition postulate", "Transitive property of equality", "Given", "Segment addition postulate", "Substitution property", "Given"],
	// Reasons for proof 4.
	["Corresponding angles postulate", "Diagram", "Given", "Transitive property of congruence", "Vertical angles theorem", "Diagram", "Commutative property of equality"]
];

// Defines the statement orders in the answers for each proof.
var answerStatements = [
	// Statement answer key for proof 1.
	{optional: [], mandatoryLead: ["<i>A</i> and <i>B</i> are complementary angles", "<i>B</i> and <i>C</i> are complementary angles"], mandatoryFollow: ["<i>A</i> + <i>B</i> = 90°", "<i>B</i> + <i>C</i> = 90°", "<i>A</i> + <i>B</i> = <i>B</i> + <i>C</i>"], answer: "<i>A</i> ≅ <i>C</i>"},
	// Statement answer key for proof 2.
	{optional: ["<i>A</i> and <i>G</i> are congruent"], mandatoryLead: ["<i>E</i> and <i>G</i> are vertical angles"], mandatoryFollow: ["<i>E</i> and <i>G</i> are congruent", "<i>A</i> and <i>E</i> are congruent"], answer: "<i>m</i> and <i>n</i> are parallel"},
	// Statement answer key for proof 3.
	{optional: ["<i>A</i>, <i>B</i>, <i>C</i>, and <i>D</i> are on a segment", "<img class=\"texts\" src=\"../proofFiles/images/ABCD.png\">"], mandatoryLead: ["<img class=\"texts\" src=\"../proofFiles/images/ACABBC.png\">", "<img class=\"texts\" src=\"../proofFiles/images/BDCDBC.png\">"], mandatoryFollow: ["<img class=\"texts\" src=\"../proofFiles/images/ACCDBC.png\">"], answer: "<img class=\"texts\" src=\"../proofFiles/images/ACBD.png\">"},
	// Statement answer key for proof 4.
	{optional: ["<i>m</i> and <i>n</i> are parallel"], mandatoryLead: ["<i>D</i> and <i>H</i> are corresponding angles", "<i>H</i> and <i>F</i> are vertical angles"], mandatoryFollow: ["<i>D</i> is congruent to <i>H</i>", "<i>H</i> is congruent to <i>F</i>"],  answer: "<i>D</i> is congruent to <i>F</i>"}
];

// Defines the reason orders in the answers for each proof.
var answerReasons = [
	// Reason answer key for proof 1.
	{optional: [], mandatoryLead: ["Diagram", "Diagram"], mandatoryFollow: ["Sum of complementary angles", "Sum of complementary angles", "Transitive property of equality"], answer: "Addition property of equality"},
	// Reason answer key for proof 2.
	{optional: ["Given"], mandatoryLead: ["Diagram"], mandatoryFollow: ["Vertical angles congruence theorem", "Transitive property of congruence"], answer: "Corresponding angles converse"},
	// Reason answer key for proof 3.
	{optional: ["Given", "Given"], mandatoryLead:["Segment addition postulate", "Segment addition postulate"], mandatoryFollow: ["Substitution property"], answer: "Transitive property of equality"},
	// Reason answer key for proof 4.
	{optional: ["Given"], mandatoryLead: ["Diagram", "Diagram"], mandatoryFollow: ["Corresponding angles postulate", "Vertical angles theorem"], answer: "Transitive property of congruence"}
];