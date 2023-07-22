function Projects() {
  return (
    <div className="flex-row">
      <div>
        <img className="px-2 resize-img" src="vendinhas.png" alt="Vendinhas logo" />
        <img className="px-2 resize-img" src="Vendinhas_frame.png" alt="vendinhas app" />
      </div>
      <div className="content">
        <p>
          This project was created to help small sales consultants organize and
          manage their inventory, create and track sales, and manage customer
          billing. This will reduce response time and allow customers to check
          the order they placed with the consultant, so they can track and
          provide feedback on the sale that was made. There will be a dedicated
          customer login area and through this (or by email) the information
          will be available. The first stage of development is the
          implementation of the backend, developed in Node JS, followed by the
          frontend which is being developed in React and finally the mobile in
          React Native. These are the technologies that give a flexibility to
          develop and the learning curve is minimal, in addition to my taste as
          a developer.
        </p>
      </div>
    </div>
  );
}

export { Projects };
