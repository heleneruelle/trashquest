function FeaturePlan() {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Feature</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>March 2025</td>
          <td>Fix user session (losing auth token)</td>
          <td>bug</td>
        </tr>
        <tr>
          <td>March 2025</td>
          <td>Highlight quest on Marker hover (and reverse)</td>
          <td>feature, map</td>
        </tr>
        <tr>
          <td>April 2025</td>
          <td>
            Mail users (quest reminder, new joiner alert, quest cancel alert
            etc...)
          </td>
          <td>feature, quest</td>
        </tr>
        <tr>
          <td>April 2025</td>
          <td>Mobile layout</td>
          <td>feature, mobile</td>
        </tr>
        <tr>
          <td>Mai 2025</td>
          <td>Add guide for recycling practices</td>
          <td>feature, guide</td>
        </tr>
        <tr>
          <td>Mai 2025</td>
          <td>Add forum in quest (enable discussions and medias)</td>
          <td>feature, quest</td>
        </tr>
      </tbody>
    </table>
  );
}

export default FeaturePlan;
