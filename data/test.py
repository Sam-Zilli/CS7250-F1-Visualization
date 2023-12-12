import pandas as pd
import os

# Read the race data
delete_cols = pd.read_csv("/Users/sam/Documents/VisualStudiosProjects/CS7250/Final Project/CS7250-F1-Visualization/data/deleted_columns.csv")

# Read the result data
drivers = pd.read_csv("/Users/sam/Documents/VisualStudiosProjects/CS7250/Final Project/CS7250-F1-Visualization/data/drivers.csv")

# Merge the two datasets based on the shared column "raceId"
merged_data = pd.merge(delete_cols, drivers, on="driverId")

# Write the merged data to a new CSV file
merged_data.to_csv("/Users/sam/Documents/VisualStudiosProjects/CS7250/Final Project/CS7250-F1-Visualization/data/second_merged_data.csv", index=False)






# Script to delete unwanted columns from csv
# Read the merged data
# merged_data = pd.read_csv("/Users/sam/Documents/VisualStudiosProjects/CS7250/Final Project/CS7250-F1-Visualization/data/merged_data.csv")

# # List of columns to remove
# columns_to_remove = ["time_x"
#                      ,"url","fp1_date","fp1_time","fp2_date","fp2_time","fp3_date",
#                      "fp3_time","quali_date","quali_time","sprint_date","sprint_time",
#                      "constructorId","number","grid","position","positionText",
#                      "positionOrder", "laps", "time_y", "milliseconds", "fastestLap", 
#                      "fastestLapTime", "fastestLapSpeed"]

# # Remove specified columns
# merged_data = merged_data.drop(columns=columns_to_remove, errors="ignore")

# # Write the modified data to a new CSV file
# merged_data.to_csv("/Users/sam/Documents/VisualStudiosProjects/CS7250/Final Project/CS7250-F1-Visualization/data/deleted_columns.csv", index=False)