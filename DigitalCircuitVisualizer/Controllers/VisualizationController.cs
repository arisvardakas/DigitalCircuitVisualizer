using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json;

namespace DigitalCircuitVisualizer.Controllers
{
    public class VisualizationController : ControllerBase
    {
        public Dictionary<string, List<string>> PlaceLines(string url)
        {
            using StreamReader sr = new StreamReader(url);
            string content = sr.ReadToEnd();
            string[] sum = content.Split("CoreRow\tHorizontal");
            List<string> coordinate = new List<string>();
            List<string> height = new List<string>();
            List<string> numsites = new List<string>();
            for (int i = 1; i < sum.Length; i++)
            {
                string coordinateFinal = string.Empty;
                string[] coordinateTemp = sum[i].Split("Height");
                coordinateTemp = coordinateTemp[0].Split("Coordinate");
                coordinateTemp = coordinateTemp[1].Split(":");
                coordinateFinal = coordinateTemp[1].Trim().Replace("\t", "").Replace("\n", "");
                string heightFinal = string.Empty;
                string[] heightTemp = sum[i].Split("Sitewidth");
                heightTemp = heightTemp[0].Split("Height");
                heightTemp = heightTemp[1].Split(":");
                heightFinal = heightTemp[1].Trim().Replace("\t", "").Replace("\n", "");
                string numsitesFinal = string.Empty;
                string[] numsitesTemp = sum[i].Split("End");
                numsitesTemp = numsitesTemp[0].Split("Numsites");
                numsitesTemp = numsitesTemp[1].Split(":");
                numsitesFinal = numsitesTemp[1].Trim().Replace("\t", "").Replace("\n", "");
                coordinate.Add(coordinateFinal);
                height.Add(heightFinal);
                numsites.Add(numsitesFinal);
            }
            Dictionary<string, List<string>> data = new Dictionary<string, List<string>>() {
                { "coordinate", coordinate },
                { "height", height },
                { "numsites", numsites }
            };
            return data;
        }

        public Dictionary<string, List<string>> PlaceNodes(string url)
        {
            string[] content = System.IO.File.ReadAllLines(url);
            List<string> nodes = new List<string>();
            List<string> places = new List<string>();
            int i = 0;
            foreach (string line in content)
            {
                if (i >= 6)
                {
                    string[] sum = line.Split("\t");
                    nodes.Add(sum[1]);
                    places.Add(sum[2]);
                }
                i++;
            }
            Dictionary<string, List<string>> data = new Dictionary<string, List<string>>() {
                { "nodes", nodes },
                { "places", places }
            };
            return data;
        }

        public Dictionary<string, List<string>> PlaceEdges(string url)
        {
            string[] lines = System.IO.File.ReadAllLines(url);
            List<string> edges = new List<string>();
            for (int i = 0; i < lines.Length; i++)
            {
                if (lines[i].StartsWith("\t") && !lines[i - 1].StartsWith("\t") && i >= 8)
                {
                    string prevLine = lines[i - 1];
                    string[] prevContent = prevLine.Split("\t");
                    string num = prevContent[2];
                    List<string> tempList = new List<string>();
                    for (int j = 0; j < Convert.ToInt32(num); j++)
                    {
                        string newLine = lines[i + j];
                        string[] temp = newLine.Split("\t");
                        tempList.Add(temp[1]);
                    }
                    edges.Add(JsonConvert.SerializeObject(tempList));
                }
            }
            Dictionary<string, List<string>> data = new Dictionary<string, List<string>>() {
                { "edges", edges }
            };
            return data;
        }

        public Dictionary<string, List<string>> MoveNodes(string url)
        {
            string[] content = System.IO.File.ReadAllLines(url);
            List<string> nodes = new List<string>();
            List<string> placesX = new List<string>();
            List<string> placesY = new List<string>();
            foreach (string line in content)
            {
                string[] sum = line.Split("\t");
                nodes.Add(sum[0]);
                placesX.Add(sum[1]);
                placesY.Add(sum[2]);
            }
            Dictionary<string, List<string>> data = new Dictionary<string, List<string>>() {
                { "nodes", nodes },
                { "placesX", placesX },
                { "placesY", placesY }
            };
            return data;
        }

        [HttpPost, Route("/visualize")]
        public string Visualize([FromBody] Visualization visualization)
        {
            Dictionary<string, List<string>> placeLines = new Dictionary<string, List<string>>();
            Dictionary<string, List<string>> placeNodes = new Dictionary<string, List<string>>();
            Dictionary<string, List<string>> placeEdges = new Dictionary<string, List<string>>();
            Dictionary<string, List<string>> moveNodes = MoveNodes(Path.Combine(Constants.PUBLIC_URL, visualization.UrlMoveNodes));
            if (!visualization.HasTypeOnly)
            {
                placeLines = PlaceLines(Path.Combine(Constants.PUBLIC_URL, visualization.UrlPlaceLines));
                placeNodes = PlaceNodes(Path.Combine(Constants.PUBLIC_URL, visualization.UrlPlaceNodes));
                placeEdges = PlaceEdges(Path.Combine(Constants.PUBLIC_URL, visualization.UrlPlaceEdges));
            }         
            Dictionary<string, Dictionary<string, List<string>>> data = new Dictionary<string, Dictionary<string, List<string>>>() {
                { "placeLines", placeLines },
                { "placeNodes", placeNodes },
                { "placeEdges", placeEdges },
                { "moveNodes", moveNodes }
            };
            return JsonConvert.SerializeObject(data);
        }
    }
}