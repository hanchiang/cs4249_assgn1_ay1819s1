// Class used to track experiment
class ExperimentTracker {


	constructor() {
		this.trials = [[], [], []];
		this.attempt = 0;
		this.round = 1;
		this.trial = null;
		this.attempt = null;
		this.menuType = null;
		this.menuDepth = null;
		this.menuBreadth = null;
		this.targetItem = null;
		this.selectedItem = '';
		this.startTime = null;
		this.endTime = null;
		this.startReaction = null;
		this.endReaction = null;
		// pre survey
		this.id = null;
		this.name = null;
		this.age = null;
		this.occupation = null;
		this.frequency = null;
		// post survey
		this.ease = null;
		this.clear = null;
		this.preference = null;
		this.difficulties = null;
		this.comments = null;
	}
	
	resetTimers(){
		this.startTime = null;
		this.endTime = null;
	}

	startTimer() {
		this.startTime = Date.now();
	}

	startReactionTime() {
		this.startReaction = Date.now();
	}

	endReactionTime() {
		this.endReaction = Date.now();
	}

	recordSelectedItem(selectedItem) {
		this.selectedItem = selectedItem;
		this.stopTimer();
	}

	stopTimer() {
		
		this.endTime = Date.now();
		this.trials[this.round-1].push([this.round, this.trial, this.attempt, this.menuType, this.menuBreadth, this.menuDepth,
			this.targetItem, this.selectedItem, this.startTime, this.endTime, this.startReaction, this.endReaction])
		this.resetTimers();
		this.attempt++;

	}

	newTrial() {
		this.attempt = 1;
	}

	toCsv() {
		var csvFile = "Name,Age,Occupation,Computer usage frequency\n";
		csvFile += [this.name, this.age, this.occupation, this.frequency].join(",") + "\n\n";

		var correctTrials = 0;

		csvFile += "ID,Round,Trial,Attempt,Menu Type,Menu Breadth,Menu Depth,Target Item,Selected Item,Start Time, End Time,Start Reaction, End Reaction\n";
		for (var i = 0; i < this.trials.length; i++) {
			const trialsInround = this.trials[i];

			for (var j = 0; j < trialsInround.length; j++) {
				if (trialsInround[j][6] == trialsInround[j][7]) {
					correctTrials++;
				}
				csvFile += this.id + "," + trialsInround[j].join(',');
				csvFile += "\n";
			}
		}

		csvFile += "Accuracy\n";
		const accuracy = (correctTrials / (3 * this.trials[0].length) * 100);
		console.log(accuracy);
		csvFile += (accuracy + '%');
		csvFile += "\n\n";

		csvFile += "Test is simple,Instructions were clear,Technique preference,Difficulties,Comments\n";
		csvFile += [this.ease, this.clear, this.preference, this.difficulties, this.comments].join(",") + "\n";

		var hiddenLink = document.createElement('a');
		hiddenLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvFile);
		hiddenLink.target = '_blank';
		hiddenLink.download = 'experiment.csv';
		document.body.appendChild(hiddenLink);
		hiddenLink.click();
	}


}