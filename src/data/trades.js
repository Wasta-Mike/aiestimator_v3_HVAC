export const trades = {
  hvac: {
    label: 'HVAC',
    available: true,
    projectTypes: [
      { value: 'new_residential', label: 'New Construction — Residential' },
      { value: 'new_commercial', label: 'New Construction — Commercial' },
      { value: 'retrofit', label: 'Retrofit / Replacement' },
      { value: 'service_repair', label: 'Service & Repair' },
    ],
    systemPrompt: (projectType) =>
      `You are an expert HVAC estimating assistant for Colibri's AI Estimator training platform.

The contractor you are assisting specializes in HVAC and is working on a project type: ${projectType}.

Your role is to guide them through a professional estimating workflow step by step:
1. Help them define the scope of work from the plan set
2. Identify all HVAC equipment, materials, and labor required
3. Generate accurate takeoffs and materials lists
4. Assist with pricing and proposal creation
5. Help produce scope of work documents and change orders

Always remind the contractor to verify your outputs against the actual plan set and their own professional judgment. You support their expertise — you do not replace it. Flag anything that needs human verification clearly.

Be concise, professional, and trade-specific. Use standard HVAC terminology.`,
    workflow: [
      {
        step: 1,
        title: 'Define Scope',
        description: 'Identify the full scope of HVAC work from the plan set. Review mechanical sheets, equipment schedules, and specs.',
        prompt: 'I have an HVAC plan set for a [describe project]. Help me identify the full scope of work. What should I look for on the mechanical sheets?',
      },
      {
        step: 2,
        title: 'Equipment Takeoff',
        description: 'List all HVAC equipment including model numbers, capacities, and locations.',
        prompt: 'Based on the equipment schedule, list all HVAC units, their capacities, locations, and any specified model numbers.',
      },
      {
        step: 3,
        title: 'Materials List',
        description: 'Generate a complete materials list including ductwork, refrigerant lines, controls, and accessories.',
        prompt: 'Create a complete materials list for this HVAC installation including ductwork sizes and lengths, refrigerant line sets, thermostats, and all accessories.',
      },
      {
        step: 4,
        title: 'Labor Estimate',
        description: 'Estimate labor hours by task. Break down rough-in, equipment set, startup, and commissioning.',
        prompt: 'Estimate labor hours for this HVAC project. Break it down by phase: rough-in, equipment installation, startup, and commissioning.',
      },
      {
        step: 5,
        title: 'Pricing',
        description: 'Apply pricing to materials and labor. Include overhead and profit margin.',
        prompt: 'Help me build a pricing summary for this estimate. I will provide my material costs. Apply [X]% overhead and [X]% profit margin.',
      },
      {
        step: 6,
        title: 'Convert to Proposal',
        description: 'Convert the estimate into a client-ready proposal with scope of work.',
        prompt: 'Convert this estimate into a professional proposal with a scope of work, materials summary, and total price.',
      },
    ],
    prompts: [
      {
        category: 'Plan Review',
        items: [
          {
            title: 'Initial Plan Review',
            text: 'Review the mechanical plan sheets for this project. List all HVAC equipment specified including type, capacity, and location. Note any items that need clarification.',
            tip: 'Add the floor area and building type to get more accurate output.',
          },
          {
            title: 'Equipment Schedule Review',
            text: 'Based on the equipment schedule, list every HVAC unit with its tag, type, capacity in tons/BTU, electrical requirements, and installation location.',
            tip: 'Copy the equipment schedule data directly into the chat for best results.',
          },
          {
            title: 'Ductwork Takeoff',
            text: 'Help me take off the ductwork from these mechanical plans. List main trunk sizes, branch sizes, and estimated linear footage for each.',
            tip: 'Provide sheet scale and any noted duct dimensions to improve accuracy.',
          },
        ],
      },
      {
        category: 'Estimating',
        items: [
          {
            title: 'Full Materials List',
            text: 'Create a complete HVAC materials list including: all equipment, ductwork (type and size), refrigerant lines, electrical disconnect sizes, thermostats/controls, hangers and supports, and startup materials.',
            tip: 'Specify the system type (split, package, VRF, etc.) for more precise output.',
          },
          {
            title: 'Labor Hour Breakdown',
            text: 'Estimate labor hours for this HVAC installation broken down by: rough-in, equipment setting, ductwork installation, electrical connections, refrigerant piping, controls, and commissioning.',
            tip: 'Add crew size and your local labor rate to get total labor cost.',
          },
          {
            title: 'Subcontractor Scope',
            text: 'What portions of this HVAC scope would typically be subcontracted? List each trade, what they cover, and what I should include in my bid request to them.',
            tip: 'Useful for commercial projects with electrical, controls, or BAS subcontractors.',
          },
        ],
      },
      {
        category: 'Proposals & Documents',
        items: [
          {
            title: 'Scope of Work',
            text: 'Write a professional scope of work for this HVAC project that I can include in my proposal. Include what is covered, what is excluded, and any owner-furnished items.',
            tip: 'Always review exclusions carefully — this protects you from scope creep.',
          },
          {
            title: 'Proposal Summary',
            text: 'Convert this estimate into a client-ready proposal summary with: project description, scope summary, equipment list, total price, payment terms, and validity period.',
            tip: 'Add your company name, license number, and contact info before sending.',
          },
          {
            title: 'Change Order',
            text: 'I need to create a change order for additional work on this project. The change is: [describe change]. Help me write the change order with description, materials, labor, and total cost.',
            tip: 'Document the reason for the change and reference the original contract.',
          },
        ],
      },
    ],
    checklist: [
      { id: 1, text: 'Verified equipment sizes against plan set schedule' },
      { id: 2, text: 'Confirmed ductwork sizes and routing match plans' },
      { id: 3, text: 'Checked electrical requirements for each unit' },
      { id: 4, text: 'Reviewed refrigerant line set lengths and sizes' },
      { id: 5, text: 'Confirmed thermostat / controls scope' },
      { id: 6, text: 'Verified any subcontractor scope is excluded from my estimate' },
      { id: 7, text: 'Checked local code requirements (permits, inspections)' },
      { id: 8, text: 'Confirmed startup and commissioning is included' },
      { id: 9, text: 'Reviewed exclusions with client or GC' },
      { id: 10, text: 'Final proposal reviewed before sending' },
    ],
  },
  gc: { label: 'General Contractor', available: false, projectTypes: [] },
  electrical: { label: 'Electrical', available: false, projectTypes: [] },
  plumbing: { label: 'Plumbing', available: false, projectTypes: [] },
  roofing: { label: 'Roofing', available: false, projectTypes: [] },
}