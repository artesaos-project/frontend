function ProfileDescription({description}: { description: string | null }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
        <h3 className="mt-4 text-center">
            {description}
        </h3>
    </div>
  );
}

export default ProfileDescription;