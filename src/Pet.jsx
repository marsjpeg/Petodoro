import petImage from './assets/pet.gif';

function Pet() {
    
    return (
        <div className="pet-container">
        <img 
            src={petImage} 
            alt="Pomodoro Pet"
            className="pet-image" 
        />
        </div>
    );
}

export default Pet