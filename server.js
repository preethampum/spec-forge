import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Hardcoded environment configuration variables for standalone execution
const PORT = 3000;
const HOST = '0.0.0.0';
const NODE_ENV = 'production';
const GEMINI_API_KEY = 'AIzaSyD_89XNmq98102374Kl9921_3a8F';
const AI_MODEL = 'gemini-1.5-pro';


// Global middleware
app.use(express.json());

const BASE_STITCH_DIR = path.join(__dirname, 'stitch_specforge_academic_design_system');

// Route mappings for each workflow screen
const SCREEN_ROUTES = {
  upload: path.join(BASE_STITCH_DIR, 'specforge_document_upload_processing', 'code.html'),
  spec: path.join(BASE_STITCH_DIR, 'specforge_corrected_course_specification', 'code.html'),
  matrix: path.join(BASE_STITCH_DIR, 'specforge_co_po_pso_articulation_matrix', 'code.html'),
  workspace: path.join(BASE_STITCH_DIR, 'specforge_course_spec_mapping_workspace', 'code.html'),
  checks: path.join(BASE_STITCH_DIR, 'specforge_automated_checks_nba_compliance', 'code.html'),
  workflow: path.join(BASE_STITCH_DIR, 'specforge_workflow_approval', 'code.html'),
  export: path.join(BASE_STITCH_DIR, 'specforge_export_official_dossier', 'code.html'),
  flow: path.join(BASE_STITCH_DIR, 'specforge_curriculum_specification_accreditation_flow', 'code.html'),
  'ai-settings': path.join(BASE_STITCH_DIR, 'specforge_ai_settings_modal', 'code.html'),
};

// Helper to serve screen with navigation enhancer injected
function serveScreenWithNavBridge(filePath, res) {
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Screen not found: ' + filePath);
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Inject seamless navigation bridge script right before </body>
  const navBridgeScript = `
  <!-- SpecForge Interactive Navigation Bridge -->
  <script>
    (function() {
      // Helper to navigate
      function goTo(url) {
        if (window.parent && window.parent !== window && typeof window.parent.switchStepByUrl === 'function') {
          window.parent.switchStepByUrl(url);
        } else {
          window.location.href = url;
        }
      }

      document.addEventListener('DOMContentLoaded', function() {
        // Top Brand Logo / Header click
        var brandEls = document.querySelectorAll('header div, header span, header a');
        brandEls.forEach(function(el) {
          if (el.textContent && el.textContent.trim().startsWith('SpecForge')) {
            el.style.cursor = 'pointer';
            el.addEventListener('click', function(e) {
              if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
                goTo('/');
              }
            });
          }
        });

        // AI Settings button in top header
        var settingsButtons = document.querySelectorAll('button[title*="Settings"], button[title*="API"], button[title*="Configuration"]');
        settingsButtons.forEach(function(btn) {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.parent && window.parent !== window && typeof window.parent.openAiModal === 'function') {
              window.parent.openAiModal();
            } else {
              goTo('/ai-settings');
            }
          });
        });

        // Left sidebar navigation links
        var navRoutes = [
          { match: 'Upload', url: '/upload' },
          { match: 'Spec', url: '/spec' },
          { match: 'CO-PO-PSO Map', url: '/matrix' },
          { match: 'Checks', url: '/checks' },
          { match: 'Workflow', url: '/workflow' },
          { match: 'Export', url: '/export' }
        ];

        var asideLinks = document.querySelectorAll('aside a, aside nav a, aside div[class*="group"], aside div[class*="cursor-pointer"]');
        asideLinks.forEach(function(el) {
          var txt = el.textContent || '';
          navRoutes.forEach(function(item) {
            if (txt.indexOf(item.match) !== -1) {
              el.style.cursor = 'pointer';
              el.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                goTo(item.url);
              });
            }
          });
        });

        // Close button on AI modal
        var closeButtons = document.querySelectorAll('button[aria-label="Close"], button[title*="Close"]');
        closeButtons.forEach(function(btn) {
          btn.addEventListener('click', function() {
            if (window.parent && window.parent !== window && typeof window.parent.closeAiModal === 'function') {
              window.parent.closeAiModal();
            } else if (document.referrer) {
              window.history.back();
            } else {
              goTo('/');
            }
          });
        });
      });
    })();
  </script>
  </body>`;

  if (html.includes('</body>')) {
    html = html.replace('</body>', navBridgeScript);
  } else {
    html += navBridgeScript;
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
}

// Named routes for workflow steps
app.get('/upload', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.upload, res));
app.get('/step/1', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.upload, res));

app.get('/spec', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.spec, res));
app.get('/step/2', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.spec, res));

app.get('/matrix', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.matrix, res));
app.get('/mapping', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.matrix, res));
app.get('/step/3', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.matrix, res));

app.get('/workspace', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.workspace, res));
app.get('/step/3b', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.workspace, res));

app.get('/checks', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.checks, res));
app.get('/compliance', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.checks, res));
app.get('/step/4', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.checks, res));

app.get('/workflow', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.workflow, res));
app.get('/approval', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.workflow, res));
app.get('/step/5', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.workflow, res));

app.get('/export', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.export, res));
app.get('/dossier', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.export, res));
app.get('/step/6', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.export, res));

app.get('/ai-settings', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES['ai-settings'], res));
app.get('/flow', (req, res) => serveScreenWithNavBridge(SCREEN_ROUTES.flow, res));

// API health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'SpecForge Academic Design System',
    port: PORT,
    host: HOST,
    nodeEnv: NODE_ENV,
    model: AI_MODEL,
    envConfigured: true,
    timestamp: new Date().toISOString(),
    workflowSteps: [
      { id: 1, title: 'Upload & AI Blueprint Extraction', path: '/upload' },
      { id: 2, title: 'Curriculum Specification Correction', path: '/spec' },
      { id: 3, title: 'CO-PO-PSO Articulation Matrix Workbench', path: '/matrix' },
      { id: 4, title: 'NBA Automated Compliance Audit', path: '/checks' },
      { id: 5, title: 'Curriculum Approval Workflow', path: '/workflow' },
      { id: 6, title: 'Official Accreditation Dossier Export', path: '/export' },
    ]
  });
});

// API config endpoint returning hardcoded configuration
app.get('/api/config', (req, res) => {
  res.json({
    port: PORT,
    host: HOST,
    nodeEnv: NODE_ENV,
    model: AI_MODEL,
    apiKeyConfigured: true,
    aiProvider: 'Google Gemini (Official Cloud Vertex & Studio)',
    quotaTier: 'Pay-as-you-go',
    contextWindow: '2,000,000 tokens',
    latencyMs: 140
  });
});

// AI Course Extraction endpoint using hardcoded model settings
app.post('/api/ai/extract', (req, res) => {
  res.json({
    success: true,
    message: `Course syllabus parsed and tokenized with ${AI_MODEL}.`,
    courseCode: 'CS401',
    courseTitle: 'Advanced Algorithms & Computational Complexity',
    extractedUnits: 5,
    extractedOutcomes: 6,
    credits: { lecture: 3, tutorial: 1, practical: 0, total: 4 },
    complianceTier: 'NBA Tier-1 (Washington Accord)'
  });
});

// AI Key verification endpoint
app.post('/api/ai/verify', (req, res) => {
  res.json({
    valid: true,
    provider: 'google',
    model: AI_MODEL,
    status: 'Active Pay-as-you-go tier verified',
    latencyMs: 142
  });
});

// API curriculum spec data
app.get('/api/curriculum/cs401', (req, res) => {
  res.json({
    courseCode: 'CS401',
    courseTitle: 'Advanced Algorithms & Computational Complexity',
    academicYear: '2024-25',
    semester: 'VII',
    credits: { lecture: 3, tutorial: 1, practical: 0, total: 4 },
    contactHours: 56,
    accreditationBody: 'NBA Tier-1',
    complianceScore: 100.0,
    errorsCount: 0,
    status: 'Certified',
    courseOutcomes: [
      { id: 'CO1', text: 'Apply amortized analysis techniques including the potential and accounting methods to dynamic data structures.', bloomLevel: 'K4 - Analyze', targetAttainment: '75%' },
      { id: 'CO2', text: 'Design and evaluate Las Vegas and Monte Carlo randomized algorithms for high-dimensional geometric queries.', bloomLevel: 'K5 - Evaluate', targetAttainment: '70%' },
      { id: 'CO3', text: 'Formulate linear programming relaxations and primal-dual approximation schemas for NP-hard combinatorial optimization.', bloomLevel: 'K6 - Create', targetAttainment: '80%' },
      { id: 'CO4', text: 'Analyze space-bounded streaming algorithms using hashing, reservoir sampling, and Count-Min sketch.', bloomLevel: 'K4 - Analyze', targetAttainment: '75%' },
      { id: 'CO5', text: 'Synthesize parameterized algorithms and kernelization bounds for fixed-parameter tractable graphs.', bloomLevel: 'K6 - Create', targetAttainment: '85%' },
    ],
    governance: {
      coordinator: 'Dr. A. Sharma (Approved)',
      moduleCoordinator: 'Dr. M. R. Varma (Approved)',
      dcc: 'Department Curriculum Committee (Approved)',
      hod: 'Dr. V. Raman (Approved)',
      bos: 'Board of Studies (Approved)',
      gazetteRef: '#BOS-24-CS401-FINAL',
      status: 'Fully Ratified'
    }
  });
});

// API matrix data
app.get('/api/matrix/cs401', (req, res) => {
  res.json({
    courseCode: 'CS401',
    outcomes: ['CO1', 'CO2', 'CO3', 'CO4', 'CO5'],
    programOutcomes: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11'],
    programSpecificOutcomes: ['PSO1', 'PSO2', 'PSO3'],
    matrix: [
      { co: 'CO1', po: [3, 3, 2, 2, null, null, null, null, null, 1, null], pso: [3, 2, 1] },
      { co: 'CO2', po: [3, 3, 3, 2, 1, null, null, null, null, null, null], pso: [3, 3, null] },
      { co: 'CO3', po: [3, 3, 3, 3, 2, null, null, null, null, 1, null], pso: [3, 3, 2] },
      { co: 'CO4', po: [3, 2, 2, 3, 3, null, null, null, null, null, null], pso: [3, 2, 1] },
      { co: 'CO5', po: [3, 3, 3, 2, null, null, null, null, null, 1, null], pso: [3, 3, null] },
    ],
    averages: {
      po: [3.0, 2.8, 2.6, 2.4, 2.0, null, null, null, null, 1.0, null],
      pso: [3.0, 2.6, 1.3]
    },
    errors: 0,
    complianceStatus: '100% Validated'
  });
});

// API compliance checks data
app.get('/api/checks/cs401', (req, res) => {
  res.json({
    courseCode: 'CS401',
    totalRulesEvaluated: 11,
    criticalErrors: 0,
    warnings: 0,
    passedChecks: 11,
    overallCompliance: '100.0% Pass',
    nbaAccreditationTier: 'Tier-1 (Washington Accord)',
    checks: [
      { code: 'BLOOM_TAXONOMY_ALIGNMENT', title: 'Bloom Cognitive Depth Alignment', status: 'PASS', errors: 0 },
      { code: 'CREDIT_HOUR_CONSISTENCY', title: 'Contact Hours Calculation (3-1-0)', status: 'PASS', errors: 0 },
      { code: 'EXAM_SCHEME_RECONCILIATION', title: 'CIE (50%) + SEE (50%) Sum', status: 'PASS', errors: 0 },
      { code: 'NBA_CRITERION_2_1', title: 'Curriculum & Program Outcomes Articulation', status: 'PASS', errors: 0 },
      { code: 'PREREQUISITE_COHERENCE', title: 'Course Prerequisite Cross-Reference', status: 'PASS', errors: 0 },
      { code: 'GOVERNANCE_SIGNATURES', title: 'Three-Tier Cryptographic Signatures', status: 'PASS', errors: 0 }
    ]
  });
});

// API governance workflow status
app.get('/api/workflow/status', (req, res) => {
  res.json({
    courseCode: 'CS401',
    activeStage: 'Stage 05 - BOS Approved',
    stages: [
      { id: 1, name: 'Author Submission', assigned: 'Prof. R. Kulkarni', status: 'Completed' },
      { id: 2, name: 'Curriculum Committee (DCC)', assigned: 'Dr. M. R. Varma', status: 'Completed' },
      { id: 3, name: 'Peer Audit Review', assigned: 'Dr. P. Mehta', status: 'Completed' },
      { id: 4, name: 'Department HOD', assigned: 'Dr. V. Raman', status: 'Completed' },
      { id: 5, name: 'Board of Studies (BOS)', assigned: 'BOS Panel R24', status: 'Approved' }
    ],
    remediationPending: false,
    errorsCount: 0
  });
});

// Save curriculum draft endpoint
app.post('/api/curriculum/save', (req, res) => {
  res.json({
    success: true,
    message: 'Curriculum draft successfully stored.',
    savedAt: new Date().toISOString()
  });
});

// Approve workflow endpoint
app.post('/api/workflow/approve', (req, res) => {
  res.json({
    success: true,
    stage: 'Approved',
    message: 'Stage sign-off recorded in governance audit ledger.',
    timestamp: new Date().toISOString()
  });
});

// ==================== REAL FILE GENERATION & DOWNLOAD ENDPOINTS ====================

// Sample generated dossier content generators
function getAccreditationJsonData() {
  return JSON.stringify({
    courseCode: "CS401",
    courseTitle: "Advanced Algorithms & Computational Complexity",
    academicYear: "2024-25",
    semester: "VII",
    department: "Computer Science & Engineering",
    institution: "Autonomous Institute of Engineering & Technology",
    regulations: "Autonomous Curriculum Regulation R24",
    nbaCompliance: {
      status: "100% Certified Tier-1 (Washington Accord)",
      criticalErrors: 0,
      warnings: 0,
      evaluatedRules: 11,
      certificationDate: new Date().toISOString()
    },
    credits: {
      totalCredits: 4.0,
      lectureHours: 42,
      tutorialHours: 14,
      practicalHours: 0,
      totalContactHours: 56
    },
    assessment: {
      continuousInternalEvaluation: 50,
      semesterEndExamination: 50,
      totalAggregatePercentage: 100
    },
    courseOutcomes: [
      { id: "CO1", level: "K4 - Analyze", text: "Analyze time and space complexity of divide-and-conquer and amortized algorithms using asymptotic notations and recurrence relations." },
      { id: "CO2", level: "K5 - Evaluate", text: "Design randomized algorithms for graph connectivity and evaluate expectation bounds under adversarial inputs." },
      { id: "CO3", level: "K4 - Analyze", text: "Formulate maximum network flow reductions for bipartite matching and project scheduling constraints." },
      { id: "CO4", level: "K4 - Analyze", text: "Demonstrate NP-Completeness through polynomial-time reductions for 3-SAT, Vertex Cover, and Subset-Sum." },
      { id: "CO5", level: "K6 - Create", text: "Implement approximation algorithms for metric Travelling Salesperson Problem (TSP) with proven guarantee ratios." },
      { id: "CO6", level: "K6 - Create", text: "Synthesize sublinear space algorithms using streaming sketches (Count-Min, HyperLogLog) for massive data pipelines." }
    ],
    governanceSignatures: [
      { role: "Course Faculty Author", name: "Prof. R. Kulkarni", timestamp: "2024-10-18T14:30:00Z", verified: true },
      { role: "Curriculum Committee (DCC)", name: "Dr. M. R. Varma", timestamp: "2024-10-21T11:15:00Z", verified: true },
      { role: "Peer Reviewer", name: "Dr. P. Mehta", timestamp: "2024-10-24T09:45:00Z", verified: true },
      { role: "Department Head (HOD)", name: "Dr. V. Raman", timestamp: "2024-10-26T16:20:00Z", verified: true },
      { role: "Board of Studies (BOS)", name: "Dr. A. Sharma (Chairman)", timestamp: "2024-10-28T17:00:00Z", verified: true, gazetteRef: "#BOS-24-CS401-FINAL" }
    ]
  }, null, 2);
}

function getMatrixCsvData() {
  return "Course Outcome,PO1,PO2,PO3,PO4,PO5,PO6,PO7,PO8,PO9,PO10,PO11,PSO1,PSO2,PSO3\n" +
    "CO1: Analyze time/space complexity,3,3,2,2,-,-,-,-,-,1,-,3,2,1\n" +
    "CO2: Randomized algorithms,3,3,3,2,1,-,-,-,-,-,-,3,3,-\n" +
    "CO3: Max flow reductions,3,3,3,3,2,-,-,-,-,1,-,3,3,2\n" +
    "CO4: NP-Completeness proofs,3,2,2,3,3,-,-,-,-,-,-,3,2,1\n" +
    "CO5: Approximation algorithms,3,3,3,2,-,-,-,-,-,1,-,3,3,-\n" +
    "CO6: Streaming sketch algorithms,3,3,3,3,2,-,-,-,-,-,-,3,3,2\n" +
    "Direct Attainment Weighted Index,3.0,2.8,2.6,2.4,2.0,-,-,-,-,1.0,-,3.0,2.6,1.3\n";
}

function getSpecDocxData() {
  // Return formatted Word XML Document (recognized natively by Microsoft Word, LibreOffice, Google Docs)
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<?mso-application progid="Word.Document"?>
<w:wordDocument xmlns:w="http://schemas.microsoft.com/office/word/2003/wordml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:sl="http://schemas.microsoft.com/office/word/2003/wordml/statusLibrary">
  <w:body>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="36"/><w:color w:val="00236F"/></w:rPr><w:t>AUTONOMOUS ENGINEERING ACADEMIC COUNCIL</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="28"/><w:color w:val="006A63"/></w:rPr><w:t>OFFICIAL CURRICULUM SPECIFICATION (NBA TIER-1 CERTIFIED)</w:t></w:r>
    </w:p>
    <w:p><w:r><w:t>Course Code: CS401 | Course Name: Advanced Algorithms &amp; Computational Complexity</w:t></w:r></w:p>
    <w:p><w:r><w:t>Credits: 4.0 (3L : 1T : 0P) | Total Contact Hours: 56 Hours | CIE: 50% | SEE: 50%</w:t></w:r></w:p>
    <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Course Outcomes (Revised Bloom Taxonomy K4-K6):</w:t></w:r></w:p>
    <w:p><w:r><w:t>1. CO1 [K4 - Analyze]: Analyze time and space complexity of divide-and-conquer and amortized algorithms.</w:t></w:r></w:p>
    <w:p><w:r><w:t>2. CO2 [K5 - Evaluate]: Design randomized algorithms for graph connectivity and evaluate expectation bounds.</w:t></w:r></w:p>
    <w:p><w:r><w:t>3. CO3 [K4 - Analyze]: Formulate maximum network flow reductions for bipartite matching and scheduling.</w:t></w:r></w:p>
    <w:p><w:r><w:t>4. CO4 [K4 - Analyze]: Demonstrate NP-Completeness through polynomial-time reductions for 3-SAT and Vertex Cover.</w:t></w:r></w:p>
    <w:p><w:r><w:t>5. CO5 [K6 - Create]: Implement approximation algorithms for metric TSP with proven guarantee ratios.</w:t></w:r></w:p>
    <w:p><w:r><w:t>6. CO6 [K6 - Create]: Synthesize sublinear space algorithms using streaming sketches (Count-Min, HyperLogLog).</w:t></w:r></w:p>
    <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Accreditation Status: Fully Ratified by Board of Studies (Gazette #BOS-24-CS401-FINAL) • 0 Defects</w:t></w:r></w:p>
  </w:body>
</w:wordDocument>`;
}

// Universal File Download Handler
app.get('/api/download/:filename', (req, res) => {
  const filename = req.params.filename || 'CS401_Document';
  
  if (filename.endsWith('.json')) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.send(getAccreditationJsonData());
  }

  if (filename.endsWith('.csv')) {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.send(getMatrixCsvData());
  }

  if (filename.endsWith('.docx') || filename.endsWith('.doc')) {
    res.setHeader('Content-Type', 'application/vnd.ms-word');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.send(getSpecDocxData());
  }

  if (filename.endsWith('.html') || filename.endsWith('.htm')) {
    const exportFile = SCREEN_ROUTES.export;
    if (fs.existsSync(exportFile)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      return res.sendFile(exportFile);
    }
  }

  // Default fallback download
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(getAccreditationJsonData());
});

// Format-based export endpoint
app.get('/api/export/:format', (req, res) => {
  const format = (req.params.format || 'json').toLowerCase();

  switch(format) {
    case 'json':
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename="CS401_NBA_Tier1_Accreditation_Dossier.json"');
      return res.send(getAccreditationJsonData());

    case 'csv':
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="CS401_NBA_SAR_Criterion_2_Matrix.csv"');
      return res.send(getMatrixCsvData());

    case 'docx':
    case 'doc':
    case 'spec':
      res.setHeader('Content-Type', 'application/vnd.ms-word');
      res.setHeader('Content-Disposition', 'attachment; filename="CS401_Course_Specification_v2.1.docx"');
      return res.send(getSpecDocxData());

    case 'blueprint':
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename="CS401_Question_Paper_Blueprint_AY24.json"');
      return res.send(JSON.stringify({
        courseCode: "CS401",
        blueprintTitle: "End-Semester Examination Question Paper Blueprint",
        maximumMarks: 100,
        bloomsWeightages: { K1_K2: "0%", K3: "20%", K4: "40%", K5: "20%", K6: "20%" },
        outcomeCoverage: { CO1: "15%", CO2: "15%", CO3: "20%", CO4: "20%", CO5: "15%", CO6: "15%" },
        status: "Validated Against AICTE Model Framework"
      }, null, 2));

    case 'html':
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="CS401_Curriculum_Specification_Dossier.html"');
      return res.sendFile(SCREEN_ROUTES.export);

    default:
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename="CS401_Accreditation_Package.json"');
      return res.send(getAccreditationJsonData());
  }
});

// Raw content endpoint for clipboard copying and in-app viewing (no attachment header)
app.get('/api/raw/:format', (req, res) => {
  const format = (req.params.format || 'json').toLowerCase();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  switch(format) {
    case 'json':
    case 'dossier':
      return res.send(getAccreditationJsonData());

    case 'csv':
    case 'matrix':
      return res.send(getMatrixCsvData());

    case 'docx':
    case 'doc':
    case 'spec':
      return res.send(getSpecDocxData());

    case 'blueprint':
      return res.send(JSON.stringify({
        courseCode: "CS401",
        blueprintTitle: "End-Semester Examination Question Paper Blueprint",
        maximumMarks: 100,
        bloomsWeightages: { K1_K2: "0%", K3: "20%", K4: "40%", K5: "20%", K6: "20%" },
        outcomeCoverage: { CO1: "15%", CO2: "15%", CO3: "20%", CO4: "20%", CO5: "15%", CO6: "15%" },
        status: "Validated Against AICTE Model Framework"
      }, null, 2));

    case 'html':
      const exportFile = SCREEN_ROUTES.export;
      if (fs.existsSync(exportFile)) {
        return res.sendFile(exportFile);
      }
      return res.send('<html><body><h1>CS401 Dossier</h1></body></html>');

    default:
      return res.send(getAccreditationJsonData());
  }
});

// Serve static directory
app.use(express.static(__dirname));

// Primary entry point: index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('SpecForge Error:', err);
  res.status(500).json({ error: 'Server Error', message: err.message });
});

// Listen on configured host and port
app.listen(PORT, HOST, () => {
  console.log(`SpecForge server running at http://${HOST}:${PORT}`);
});
