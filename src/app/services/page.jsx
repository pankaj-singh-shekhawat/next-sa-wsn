export default function Home() {
  return (
    <div>
      <h1 className="mt-8 mb-2 text-xl uppercase tracking-widest font-bold underline">Services</h1>
      <div>
        <ol className="list-disc">
          <div className="mt-4">
            <p className="uppercase tracking-widest font-bold">Assurance services</p>
            <ol className="list-disc px-4">
              <li>Statutory Audit (Bank aduit or statutory audit of corporate)</li>
              <li>Internal and Management Audit</li>
              <li>Tax Audit (corporate/non-corporate)</li>
              <li>GST Audit,</li>
              <li>System Audit,</li>
              <li>Special Audit,</li>
              <li>Revenue Audit,</li>
              <li>Internal Control Review</li>
              <li>Due diligence</li>
            </ol>
          </div>
          <div className="mt-4">
            <p className="uppercase tracking-widest font-bold">Direct taxation</p>
            <ol className="list-disc px-4">
              <li>Personal tax - consultancy</li>
              <li>Corporate tax - consultancy</li>
              <li>Representation before revenue authorities</li>
              <li>Foreign tax remittance certification</li>
            </ol>
          </div>
          <div className="mt-4">
            <p className="uppercase tracking-widest font-bold">Indirect taxation</p>
            <ol className="list-disc px-4">
              <li>GST consultancy</li>
              <li>Consultancy - Customs</li>
            </ol>
          </div>
          <div className="mt-4">
            <p className="uppercase tracking-widest font-bold">Corporate Law consultancy</p>
            <p>As corporate law consultancy, our company's services under Company Law includes advising the client on various matters under the Companies Act, 2013 such as . </p>
            <ol className="list-disc px-4">
              <li>Company formation and registration</li>
              <li>Company liquidation,</li>
              <li>Applying for Director's Identification Number, </li>
              <li>filing of e-returns as required by ROC</li>
              <li>Other matters on how to appear before the Company Law Board, raising funds etc </li>
            </ol>
          </div>
          <div className="mt-4">
            <p className="uppercase tracking-widest font-bold">Management consultancy services</p>
            <ol className="list-disc px-4">
              <li>Accounting services</li>
              <li>Accounts and financial consultancy</li>
              <li>Management reporting and MIS</li>
            </ol>
          </div>
        </ol>
      </div>
    </div>
  );
}
