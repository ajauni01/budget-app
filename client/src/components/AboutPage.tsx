const AboutPage = () => {
  return (
    <div className="flex items-center justify-center mt-10">
      <article className="prose text-white">
        <h1>Budget Management App</h1>
        <p>
          Welcome to our user-friendly budget management app! This application
          is designed using the powerful combination of React, TypeScript, and
          Vite. It allows you to effortlessly track your monthly expenses, add
          budget items, and remove them with ease.
        </p>

        <h2>Key Features</h2>

        <h3>1. Effortless Monthly Budgeting</h3>
        <p>
          Stay on top of your finances by conveniently adding and managing your
          monthly budget items. With our intuitive interface, budgeting has
          never been this easy.
        </p>

        <h3>2. Easy Deletion</h3>
        <p>
          Need to make changes? No worries! You can delete budget items
          effortlessly to keep your budget up to date. We believe in flexibility
          and adaptability, making it simple for you to adjust your budget as
          needed.
        </p>

        <h2>Technologies Used</h2>
        <p>
          This project leverages several cutting-edge technologies to provide a
          seamless user experience:
        </p>
        <ul>
          <li>
            <strong>React</strong>: A popular JavaScript library for building
            user interfaces.
          </li>
          <li>
            <strong>TypeScript</strong>: A typed superset of JavaScript that
            enhances code quality and developer productivity.
          </li>
          <li>
            <strong>Vite</strong>: A fast build tool for modern web development
            that supports React and TypeScript.
          </li>
          <li>
            <strong>React Hook Form</strong>: Simplify form-building in React
            with efficient and easy-to-use hooks.
          </li>
          <li>
            <strong>Daisy UI</strong>: A UI library for React that enhances the
            visual appeal of your application.
          </li>
        </ul>

        <p>
          Please note that this web app is currently in development. In the near
          future, we plan to integrate React Context to enhance state
          management. Additionally, we have exciting plans to introduce signing
          and sign-up options using Google Firebase, providing a secure and
          seamless authentication experience.
        </p>

        <p>
          Feel free to explore the app, and don't hesitate to provide feedback
          or report any issues. We appreciate your support as we continue to
          improve and expand the features of this budget management app.
        </p>

        <p>Happy budgeting! 📊💰</p>
      </article>
    </div>
  );
};

export default AboutPage;
