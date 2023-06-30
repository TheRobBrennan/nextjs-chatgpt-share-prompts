import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <span className="blue_gradient">
        <h1 className="head_text text-left">{name} Profile</h1>
        <p className="desc text-left">{desc}</p>

        <div className="mt-10 prompt_layout">
          {data.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              handleEdit={() => handleEdit && handleEdit(prompt)}
              handleDelete={() => handleDelete && handleDelete(prompt)}
            />
          ))}
        </div>
      </span>
    </section>
  );
};

export default Profile;
