# import csv
# import json

# def csv_to_json(input_file, output_file):
#     # Read the CSV file into a list of dictionaries
#     with open(input_file, 'r') as csvfile:
#         reader = csv.DictReader(csvfile)
#         data = list(reader)

#     # Write the data to a JSON file
#     with open(output_file, 'w') as jsonfile:
#         jsonfile.write(json.dumps(data, indent=4))

# if __name__ == "__main__":
#     input_file = 'cleaned_data.csv'  # Replace with your input CSV file name
#     output_file = 'output.json'  # Replace with your desired output JSON file name

#     csv_to_json(input_file, output_file)


import csv
import json

def csv_to_json(input_file, output_file):
    # Read the CSV file into a list of dictionaries
    with open(input_file, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        data = list(reader)

    # Create a dictionary to store teams and their drivers
    teams_data = { }

    # Iterate through the data and organize it by teams
    for row in data:
        # team_name = row['team_name'].lower()
        driver_name = f"{row['forename']} {row['surname']}"

        # if team_name not in teams_data:
        #     teams_data[team_name] = {
        #         'team_name': team_name,
        #         'drivers': [],
        #         'final_ranking': row['final_ranking'],
        #         'points': row['points']
        #     }

        # teams_data[team_name]['drivers'].append({'driver_name': driver_name})
    teams_data['drivers'].append({'driver_name': driver_name})

    # Convert the dictionary to a list of teams
    teams_list = list(teams_data.values())

    # Write the data to a JSON file
    with open(output_file, 'w') as jsonfile:
        jsonfile.write(json.dumps(teams_list, indent=4))

if __name__ == "__main__":
    input_file = 'cleaned_data.csv'  # Replace with your input CSV file name
    output_file = 'output.json'  # Replace with your desired output JSON file name

    csv_to_json(input_file, output_file)